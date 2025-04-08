import { NextRequest, NextResponse } from 'next/server';
import { 
  generateMultipleChoiceQuestion, 
  generateOpenEndedQuestion 
} from '../../../lib/api/openai';
import { getRandomQuestionByTopicAndType } from '@/app/data/questions';

export async function POST(request: NextRequest) {
  try {
    const { topic, type = 'multiple-choice' } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    // First try to get a question from our database
    const databaseQuestion = getRandomQuestionByTopicAndType(topic, type);
    
    if (databaseQuestion) {
      return NextResponse.json({
        question: databaseQuestion
      });
    }

    // If no question found in database, fall back to OpenAI generation
    // Check if OpenAI API key is set
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is missing');
      // For development, return a mock question if API key is not set
      return NextResponse.json({
        question: getMockQuestion(topic, type)
      });
    }

    let question;
    if (type === 'multiple-choice') {
      question = await generateMultipleChoiceQuestion(topic);
    } else if (type === 'open-ended') {
      question = await generateOpenEndedQuestion(topic);
    } else {
      return NextResponse.json(
        { error: 'Invalid question type' },
        { status: 400 }
      );
    }

    return NextResponse.json({ question });
  } catch (error) {
    console.error('Error generating question:', error);
    // For development, return a mock question when there's an error
    const { topic, type = 'multiple-choice' } = await request.json().catch(() => ({ topic: 'finance', type: 'multiple-choice' }));
    return NextResponse.json({
      question: getMockQuestion(topic, type)
    });
  }
}

// Mock question for development/fallback
function getMockQuestion(topic: string, type: string) {
  if (type === 'multiple-choice') {
    return {
      id: `mock-mcq-${Date.now()}`,
      text: `What is the primary purpose of a Discounted Cash Flow (DCF) analysis in the context of ${topic}?`,
      type: 'multiple-choice',
      choices: [
        { id: 'a', text: 'To calculate the historical performance of a company' },
        { id: 'b', text: 'To determine the present value of expected future cash flows' },
        { id: 'c', text: 'To analyze a company\'s current debt obligations' },
        { id: 'd', text: 'To predict stock market trends' }
      ],
      modelAnswer: 'The primary purpose of a DCF analysis is to determine the present value of expected future cash flows. It helps in estimating the value of an investment based on its expected future cash flows, discounted back to present value using an appropriate discount rate that reflects the risk associated with those cash flows.',
      correctChoiceId: 'b',
      topic
    };
  } else {
    return {
      id: `mock-oeq-${Date.now()}`,
      text: `Explain the concept of WACC (Weighted Average Cost of Capital) and its importance in ${topic}.`,
      type: 'open-ended',
      modelAnswer: 'The Weighted Average Cost of Capital (WACC) represents the average cost a company pays for its capital, weighted by the proportion of debt and equity in its capital structure. WACC is calculated by multiplying the cost of each capital component by its proportional weight and summing the results. It\'s important because it serves as the discount rate in DCF valuations, helps evaluate new projects, and provides a benchmark for investment decisions. A lower WACC indicates less expensive financing, potentially leading to higher valuations and returns.',
      topic
    };
  }
} 