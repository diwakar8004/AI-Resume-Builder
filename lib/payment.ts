import crypto from 'crypto';
import { getRequiredEnv } from './server-utils';
import prisma from './prisma';
import { TEMPLATE_META } from '@/types/resume';

export type PlanType = 'FREE' | 'PRO';
export type BillingInterval = 'monthly' | 'yearly';

export function getPublicRazorpayKey(): string {
  return getRequiredEnv('NEXT_PUBLIC_RAZORPAY_KEY_ID');
}

export function getRazorpayKeyId(): string {
  return getRequiredEnv('RAZORPAY_KEY_ID');
}

export function getRazorpayKeySecret(): string {
  return getRequiredEnv('RAZORPAY_KEY_SECRET');
}

export function getRazorpayWebhookSecret(): string {
  return getRequiredEnv('RAZORPAY_WEBHOOK_SECRET');
}

export function verifyRazorpaySignature(signature: string, orderId: string, paymentId: string) {
  const payload = `${orderId}|${paymentId}`;
  const expected = crypto
    .createHmac('sha256', getRazorpayKeySecret())
    .update(payload)
    .digest('hex');
  return signature === expected;
}

export function premiumTemplateGuard(plan: string | undefined, templateId: string | undefined) {
  if (!templateId) return;
  const template = TEMPLATE_META[templateId as keyof typeof TEMPLATE_META];
  if (template?.isPremium && plan !== 'PRO') {
    throw new Error('Premium templates require a Pro plan.');
  }
}

export function requireProPlan(plan?: string) {
  if (plan !== 'PRO') {
    throw new Error('This feature is available only for Pro subscribers.');
  }
}

export async function createRazorpayOrder(userId: string, amount: number, interval: BillingInterval, currency = 'INR') {
  const keyId = getRazorpayKeyId();
  const secret = getRazorpayKeySecret();
  const receipt = `resumeai-${userId}-${Date.now()}`;
  const body = {
    amount,
    currency,
    receipt,
    payment_capture: 1,
    notes: {
      service: 'ResumeAI Pro',
      interval,
      userId,
    },
  };

  const response = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Razorpay order creation failed: ${text}`);
  }

  const order = await response.json();
  await prisma.paymentHistory.create({
    data: {
      userId,
      plan: interval === 'yearly' ? 'PRO' : 'PRO',
      amount,
      currency,
      razorpayOrderId: order.id,
      status: 'CREATED',
      receipt,
      notes: `Order created for ${interval}`,
    },
  });

  return order as {
    id: string;
    amount: number;
    currency: string;
  };
}
