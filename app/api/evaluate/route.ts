import { NextRequest, NextResponse } from 'next/server';
import { evaluateOpenEndedAnswer } from '../../../lib/api/openai';

export async function POST(request: NextRequest) {
  try {
    const { questionText, userAnswer, modelAnswer } = await request.json();

    if (!questionText || !userAnswer || !modelAnswer) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is set
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is missing');
      // Return mock feedback for development
      return NextResponse.json({
        feedback: getMockFeedback(userAnswer)
      });
    }

    const feedback = await evaluateOpenEndedAnswer(
      questionText,
      userAnswer,
      modelAnswer
    );

    return NextResponse.json({ feedback });
  } catch (error) {
    console.error('Error evaluating answer:', error);
    
    // Try to get the user answer for mock feedback
    let userAnswer = "";
    try {
      const body = await request.json();
      userAnswer = body.userAnswer || "";
    } catch (e) {
      // Ignore parsing error
    }
    
    // Return mock feedback on error
    return NextResponse.json({
      feedback: getMockFeedback(userAnswer)
    });
  }
}

// Mock feedback for development/fallback
function getMockFeedback(userAnswer: string) {
  const answerLength = userAnswer.length;
  let score = 'Needs improvement';
  
  // Very simple scoring based on length
  if (answerLength > 200) {
    score = 'Strong';
  } else if (answerLength > 100) {
    score = 'Good';
  }
  
  return {
    overallFeedback: `Your answer ${score === 'Strong' ? 'demonstrates good understanding' : score === 'Good' ? 'shows some understanding' : 'needs more detail and depth'}. ${score === 'Strong' ? 'You\'ve covered key concepts well.' : score === 'Good' ? 'Consider adding more specific examples.' : 'Try to include more technical details and examples to strengthen your response.'}`,
    score,
    categories: [
      {
        name: 'Technical accuracy',
        score: score,
        comment: `The ${score === 'Strong' ? 'technical content is accurate and well-explained' : score === 'Good' ? 'technical points are mostly accurate' : 'answer lacks sufficient technical detail or contains inaccuracies'}. ${score === 'Needs improvement' ? 'Review the core concepts and be more precise in your explanations.' : ''}`
      },
      {
        name: 'Clarity and structure',
        score: score,
        comment: `Your response is ${score === 'Strong' ? 'well-structured and clearly presented' : score === 'Good' ? 'adequately structured' : 'somewhat disorganized'}. ${score === 'Needs improvement' ? 'Consider using a more logical flow with clear introduction, body, and conclusion.' : ''}`
      },
      {
        name: 'Depth of insight',
        score: score,
        comment: `You've demonstrated ${score === 'Strong' ? 'strong analytical thinking' : score === 'Good' ? 'some analytical thinking' : 'limited analytical thinking'}. ${score === 'Needs improvement' ? 'Try to go beyond basic explanations and show deeper understanding of implications.' : ''}`
      }
    ]
  };
} 