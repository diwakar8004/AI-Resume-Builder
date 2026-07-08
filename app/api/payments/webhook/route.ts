import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getRazorpayWebhookSecret } from '@/lib/payment';

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get('x-razorpay-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing Razorpay signature' }, { status: 400 });
  }

  const expected = getRazorpayWebhookSecret();
  const hash = crypto.createHmac('sha256', expected).update(rawBody).digest('hex');
  try {
    const sigBuf = Buffer.from(signature, 'hex');
    const hashBuf = Buffer.from(hash, 'hex');
    if (sigBuf.length !== hashBuf.length || !crypto.timingSafeEqual(sigBuf, hashBuf)) {
      return NextResponse.json({ error: 'Webhook signature mismatch' }, { status: 400 });
    }
  } catch (err) {
    if (hash !== signature) {
      return NextResponse.json({ error: 'Webhook signature mismatch' }, { status: 400 });
    }
  }

  type RazorpayWebhookPayload = {
    event?: string;
    payload?: {
      payment?: {
        entity?: {
          order_id?: string;
          id?: string;
        };
      };
    };
  };

  const payload = JSON.parse(rawBody) as RazorpayWebhookPayload;
  const event = payload.event;
  const payment = payload.payload?.payment?.entity;

  if (event === 'payment.captured' && payment?.order_id) {
    const entry = await prisma.paymentHistory.findUnique({ where: { razorpayOrderId: payment.order_id } });
    if (!entry) {
      return NextResponse.json({ status: 'ignored' });
    }

    if (entry.status !== 'SUCCESS') {
      // apply updates atomically
      await prisma.$transaction([
        prisma.paymentHistory.update({
          where: { razorpayOrderId: payment.order_id },
          data: {
            status: 'SUCCESS',
            razorpayPaymentId: payment.id,
            razorpaySignature: signature,
            notes: 'Webhook confirmed capture',
          },
        }),
        prisma.user.update({ where: { id: entry.userId }, data: { plan: 'PRO' } }),
      ]);
    }
  }

  return NextResponse.json({ status: 'ok' });
}
