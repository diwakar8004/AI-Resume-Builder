import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';
import { auth } from '@/lib/auth';

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY environment variable');
  }
  return new OpenAI({ apiKey });
}

const coverLetterSchema = z.object({
  company: z.string().min(1).max(100),
  role: z.string().min(1).max(100),
  jobDescription: z.string().min(1).max(3000),
  tone: z.enum(['Professional', 'Confident', 'Friendly', 'Concise']).optional().default('Professional'),
  applicantName: z.string().max(100).optional().default('A dedicated candidate'),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = coverLetterSchema.parse(await req.json());
    const { company, role, jobDescription, tone, applicantName } = body;

    const prompt = `You are a highly skilled cover letter writer. Draft a concise and persuasive cover letter for a candidate named ${applicantName} applying for the role of ${role} at ${company}. The letter should be tailored to the job description below, highlight relevant experience and impact, use a ${tone.toLowerCase()} tone, and end with a confident call-to-action.

Job description:
${jobDescription}

Return only the cover letter text without headings or labels.`;

    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 650,
      temperature: 0.75,
    });

    const result = completion.choices[0]?.message?.content?.trim() || '';
    return NextResponse.json({ result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'AI error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
