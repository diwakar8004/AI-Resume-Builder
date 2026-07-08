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

const summaryRequestSchema = z.object({
  jobTitle: z.string().max(200).optional().default(''),
  experience: z
    .array(
      z.object({
        position: z.string().max(100).optional().default(''),
        company: z.string().max(100).optional().default(''),
        description: z.string().max(1000).optional().default(''),
      })
    )
    .optional()
    .default([]),
  skills: z
    .array(z.object({ name: z.string().optional().default(''), skills: z.array(z.string()).optional().default([]) }))
    .optional()
    .default([]),
  tone: z.enum(['Professional', 'Casual', 'Confident', 'Friendly']).optional().default('Professional'),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = summaryRequestSchema.parse(await req.json());
    const { jobTitle, experience, skills, tone } = body;

    const experienceSummary = (experience as { position: string; company: string; description: string }[])
      .slice(0, 3)
      .map((e) => `${e.position} at ${e.company}: ${e.description?.slice(0, 200) || ''}`)
      .join('\n');

    const skillsList = (skills as { name: string; skills: string[] }[])
      .flatMap((s) => s.skills)
      .slice(0, 10)
      .join(', ');

    const prompt = `You are an expert resume writer. Write a compelling 2–3 sentence professional summary for a "${jobTitle || 'professional'}" in a ${tone} tone.

Work experience:
${experienceSummary || 'Not provided'}

Key skills: ${skillsList || 'Not provided'}

Rules:
- Start with a strong descriptor (e.g. "Results-driven", "Innovative", "Strategic")
- Include years of experience if inferable
- Mention 2–3 key skills or technologies
- End with value proposition
- Return ONLY the summary paragraph, no labels or formatting`;

    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
      temperature: 0.75,
    });

    const result = completion.choices[0]?.message?.content?.trim() || '';
    return NextResponse.json({ result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'AI error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
