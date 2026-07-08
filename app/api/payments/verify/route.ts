import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { verifyRazorpaySignature } from '@/lib/payment';

const verificationSchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
  plan: z.enum(['monthly', 'yearly']).optional(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user;
  if (!user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = verificationSchema.parse(await req.json());

    const payment = await prisma.paymentHistory.findUnique({ where: { razorpayOrderId: body.razorpay_order_id } });
    if (!payment) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (payment.status === 'SUCCESS') {
      return NextResponse.json({ success: true, message: 'Payment already verified' });
    }

    const signatureValid = verifyRazorpaySignature(body.razorpay_signature, body.razorpay_order_id, body.razorpay_payment_id);
    if (!signatureValid) {
      await prisma.paymentHistory.update({
        where: { razorpayOrderId: body.razorpay_order_id },
        data: { status: 'FAILED', razorpayPaymentId: body.razorpay_payment_id, razorpaySignature: body.razorpay_signature, notes: 'Signature validation failed' },
      });
      return NextResponse.json({ error: 'Signature verification failed' }, { status: 400 });
    }

    await prisma.paymentHistory.update({
      where: { razorpayOrderId: body.razorpay_order_id },
      data: {
        status: 'SUCCESS',
        razorpayPaymentId: body.razorpay_payment_id,
        razorpaySignature: body.razorpay_signature,
        notes: 'Payment verified successfully',
      },
    });

    await prisma.user.update({
      where: { id: user.id as string },
      data: { plan: 'PRO' },
    });

    return NextResponse.json({ success: true, paymentId: body.razorpay_payment_id });
  } catch (error) {
    console.error('[Payment Verify] Error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to verify payment' }, { status: 500 });
  }
}
