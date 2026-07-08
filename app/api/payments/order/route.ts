import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { createRazorpayOrder } from '@/lib/payment';

const orderRequestSchema = z.object({
  plan: z.enum(['monthly', 'yearly']),
});

const pricing = {
  monthly: { amount: 49900, currency: 'INR' },
  yearly: { amount: 499000, currency: 'INR' },
};

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user;
  if (!user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = orderRequestSchema.parse(await req.json());
    const pricingTier = pricing[body.plan];
    if (!pricingTier) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }

    const order = await createRazorpayOrder(user.id as string, pricingTier.amount, body.plan, pricingTier.currency);

    return NextResponse.json(
      {
        order: {
          id: order.id,
          amount: order.amount,
          currency: order.currency,
          keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? null,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Payment Order] Error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to create order' }, { status: 500 });
  }
}
