import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobTitle = '', experience = [], skills = [], tone = 'Professional' } = body;

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
