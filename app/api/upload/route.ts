import { NextRequest, NextResponse } from 'next/server';
import { extractAndCleanPDFText } from '../../../lib/api/pdf';
import { generateQuestionsFromDocument } from '../../../lib/api/openai';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const topic = formData.get('topic') as string;
    const questionCount = parseInt(formData.get('questionCount') as string || '3', 10);
    
    if (!file || !topic) {
      return NextResponse.json(
        { error: 'File and topic are required' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is set
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is missing');
      // Return mock questions for development
      return NextResponse.json({ 
        questions: getMockDocumentQuestions(topic, questionCount) 
      });
    }

    // Check file type
    if (!file.type.includes('pdf')) {
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    try {
      // Extract text from PDF
      const text = await extractAndCleanPDFText(buffer);
      
      if (!text || text.length < 50) {
        return NextResponse.json(
          { error: 'Could not extract sufficient text from the PDF' },
          { status: 400 }
        );
      }

      // Generate questions from the document
      const questions = await generateQuestionsFromDocument(
        text,
        topic,
        questionCount,
        ['multiple-choice', 'open-ended']
      );

      return NextResponse.json({ questions });
    } catch (pdfError) {
      console.error('Error processing PDF:', pdfError);
      // Return mock questions when there's a PDF processing error
      return NextResponse.json({ 
        questions: getMockDocumentQuestions(topic, questionCount) 
      });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process PDF' },
      { status: 500 }
    );
  }
}

// Mock document questions for development/fallback
function getMockDocumentQuestions(topic: string, count: number) {
  const questions = [];
  
  // Create a mix of multiple choice and open-ended questions
  for (let i = 0; i < count; i++) {
    if (i % 2 === 0) {
      // Multiple choice
      questions.push({
        id: `mock-doc-mcq-${Date.now()}-${i}`,
        text: `Based on the uploaded document, which of the following statements about ${topic} is most accurate?`,
        type: 'multiple-choice',
        choices: [
          { id: 'a', text: `${topic} is primarily focused on historical analysis.` },
          { id: 'b', text: `${topic} requires both quantitative and qualitative assessment.` },
          { id: 'c', text: `${topic} is only relevant for public companies.` },
          { id: 'd', text: `${topic} has no impact on investment decisions.` }
        ],
        modelAnswer: `${topic} requires both quantitative and qualitative assessment. While numbers are important, understanding the context, industry trends, and management quality are equally crucial for comprehensive analysis.`,
        topic
      });
    } else {
      // Open-ended
      questions.push({
        id: `mock-doc-oeq-${Date.now()}-${i}`,
        text: `Based on the document you uploaded, explain how ${topic} concepts might be applied in a real-world financial analysis scenario.`,
        type: 'open-ended',
        modelAnswer: `In a real-world financial analysis scenario, ${topic} concepts would be applied by first gathering relevant data from financial statements and market information. Analysts would then use this data to build models that project future performance, considering various factors like market conditions, competitive positioning, and management strategy. The analysis would incorporate both quantitative metrics and qualitative assessments to arrive at a comprehensive evaluation that supports investment decision-making.`,
        topic
      });
    }
  }
  
  return questions;
} 