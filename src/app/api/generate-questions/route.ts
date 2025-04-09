import { NextRequest, NextResponse } from 'next/server';
import { generateAdditionalQuestions } from '../@/lib/api/openai';

export async function POST(request: NextRequest) {
  try {
    const { questionText, modelAnswer, topicId } = await request.json();

    if (!questionText || !modelAnswer || !topicId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is set
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is missing');
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const newQuestions = await generateAdditionalQuestions(
      questionText,
      modelAnswer,
      topicId
    );

    return NextResponse.json({ questions: newQuestions });
  } catch (error) {
    console.error('Error generating questions:', error);
    return NextResponse.json(
      { error: 'Failed to generate questions' },
      { status: 500 }
    );
  }
} 