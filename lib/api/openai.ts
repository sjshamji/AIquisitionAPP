import OpenAI from 'openai';

// Initialize OpenAI client with a check for API key
let openai: OpenAI;
try {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
} catch (error) {
  console.error('Error initializing OpenAI client:', error);
  // Create a dummy client for type safety
  openai = {} as OpenAI;
}

// Types for our questions and answers
export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'open-ended';
  choices?: { id: string; text: string }[];
  modelAnswer: string;
  topic: string;
}

export interface FeedbackResult {
  overallFeedback: string;
  score: 'Strong' | 'Good' | 'Needs improvement';
  categories: {
    name: string;
    score: 'Strong' | 'Good' | 'Needs improvement';
    comment: string;
  }[];
}

// Generate a multiple choice question
export async function generateMultipleChoiceQuestion(
  topic: string,
  documentContent?: string
): Promise<Question> {
  // Check if OpenAI API key is available
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  const prompt = documentContent
    ? `Generate a challenging multiple-choice finance interview question about ${topic} based on the following document content:
       
       ${documentContent.substring(0, 4000)}
       
       The question should test deep understanding of key concepts rather than simple memorization.
       Include 4 possible answers with one clearly correct answer.
       Output in JSON format with properties: text, choices (array of objects with id and text), modelAnswer (detailed explanation of the correct answer), and correctChoiceId (the id of the correct choice).`
    
    : `Generate a challenging multiple-choice finance interview question about ${topic} suitable for an investment banking or private equity interview.
       The question should test deep understanding of key concepts rather than simple memorization.
       Include 4 possible answers with one clearly correct answer.
       Output in JSON format with properties: text, choices (array of objects with id and text), modelAnswer (detailed explanation of the correct answer), and correctChoiceId (the id of the correct choice).`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a finance expert who creates challenging interview questions." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    const responseData = JSON.parse(completion.choices[0].message.content || '{}');
    
    // Format the response into our Question interface
    return {
      id: `mcq-${Date.now()}`,
      text: responseData.text,
      type: 'multiple-choice',
      choices: responseData.choices,
      modelAnswer: responseData.modelAnswer,
      topic,
    };
  } catch (error) {
    console.error('Error generating multiple choice question:', error);
    throw new Error('Failed to generate question');
  }
}

// Generate an open-ended question
export async function generateOpenEndedQuestion(
  topic: string,
  documentContent?: string
): Promise<Question> {
  // Check if OpenAI API key is available
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  const prompt = documentContent
    ? `Generate a challenging open-ended finance interview question about ${topic} based on the following document content:
       
       ${documentContent.substring(0, 4000)}
       
       The question should require analytical thinking and application of finance concepts.
       Output in JSON format with properties: text and modelAnswer (a comprehensive answer that would receive top scores in an interview).`
    
    : `Generate a challenging open-ended finance interview question about ${topic} suitable for an investment banking or private equity interview.
       The question should require analytical thinking and application of finance concepts.
       Output in JSON format with properties: text and modelAnswer (a comprehensive answer that would receive top scores in an interview).`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a finance expert who creates challenging interview questions." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    const responseData = JSON.parse(completion.choices[0].message.content || '{}');
    
    // Format the response into our Question interface
    return {
      id: `oeq-${Date.now()}`,
      text: responseData.text,
      type: 'open-ended',
      modelAnswer: responseData.modelAnswer,
      topic,
    };
  } catch (error) {
    console.error('Error generating open ended question:', error);
    throw new Error('Failed to generate question');
  }
}

// Evaluate an open-ended answer
export async function evaluateOpenEndedAnswer(
  questionText: string,
  userAnswer: string,
  modelAnswer: string
): Promise<FeedbackResult> {
  // Check if OpenAI API key is available
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  const prompt = `
    You are evaluating a candidate's response to a finance interview question.
    
    QUESTION: ${questionText}
    
    MODEL ANSWER: ${modelAnswer}
    
    CANDIDATE'S ANSWER: ${userAnswer}
    
    Evaluate the answer based on:
    1. Technical accuracy
    2. Clarity and structure
    3. Depth of insight
    
    For each category, provide:
    - A score (Strong, Good, or Needs improvement)
    - A 1-2 sentence comment explaining the score
    
    Also provide a 1-4 sentence overall feedback that highlights the key strengths and areas for improvement.
    
    Output your response in JSON format with properties: 
    - overallFeedback (string)
    - score (string: 'Strong', 'Good', or 'Needs improvement')
    - categories (array of objects with name, score, and comment)
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a finance expert who evaluates interview responses." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    const responseData = JSON.parse(completion.choices[0].message.content || '{}');
    
    return {
      overallFeedback: responseData.overallFeedback,
      score: responseData.score,
      categories: responseData.categories,
    };
  } catch (error) {
    console.error('Error evaluating answer:', error);
    throw new Error('Failed to evaluate answer');
  }
}

// Extract content from PDF text to generate questions
export async function generateQuestionsFromDocument(
  documentText: string,
  topic: string,
  questionCount: number = 3,
  questionTypes: ('multiple-choice' | 'open-ended')[] = ['multiple-choice', 'open-ended']
): Promise<Question[]> {
  // Check if OpenAI API key is available
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  // First, analyze the document to extract key concepts
  const analysisPrompt = `
    Analyze the following finance document text and identify ${questionCount} key concepts that would make good interview questions:
    
    ${documentText.substring(0, 6000)}
    
    Output your response in JSON format with an array of ${questionCount} objects, each containing:
    - concept: a brief description of a key finance concept from the document
    - importance: why this is important for finance interviews
  `;

  try {
    // Step 1: Analyze the document
    const analysisCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a finance expert who extracts key concepts from documents." },
        { role: "user", content: analysisPrompt }
      ],
      response_format: { type: "json_object" }
    });

    const concepts = JSON.parse(analysisCompletion.choices[0].message.content || '{}').concepts || [];
    
    // Step 2: Generate questions based on the concepts
    const questions: Question[] = [];
    
    for (let i = 0; i < Math.min(concepts.length, questionCount); i++) {
      const concept = concepts[i];
      const questionType = questionTypes[i % questionTypes.length];
      
      let question;
      if (questionType === 'multiple-choice') {
        question = await generateMultipleChoiceQuestion(`${topic}: ${concept.concept}`, documentText);
      } else {
        question = await generateOpenEndedQuestion(`${topic}: ${concept.concept}`, documentText);
      }
      
      questions.push(question);
    }
    
    return questions;
  } catch (error) {
    console.error('Error generating questions from document:', error);
    throw new Error('Failed to generate questions from document');
  }
} 