import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY environment variable');
  }
  return new OpenAI({ apiKey });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, type, tone = 'Professional', jobTitle = '' } = body;

    if (!text) {
      return NextResponse.json({ error: 'text is required' }, { status: 400 });
    }

    const prompts: Record<string, string> = {
      bullet: `You are an expert resume writer. Rewrite the following experience description as 3–5 powerful bullet points. Use strong action verbs, add quantified metrics where plausible, and use a ${tone} tone.

Text to enhance:
${text}

Return ONLY the bullet points, one per line starting with •`,

      ats: `You are an ATS optimization expert. Analyze this resume text for a "${jobTitle || 'professional'}" role and provide specific, actionable keyword and formatting improvements to increase ATS score. Be concise and direct.

Resume text / job description:
${text}

Provide 5–7 specific actionable improvements.`,
    };

    const prompt = prompts[type] || prompts.bullet;

    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
      temperature: 0.7,
    });

    const result = completion.choices[0]?.message?.content?.trim() || '';
    return NextResponse.json({ result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'AI error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
