// Import not needed for our development mock
// import * as pdfParse from 'pdf-parse';

export async function extractTextFromPDF(fileBuffer: Buffer): Promise<string> {
  try {
    // In a production environment, we would use:
    // const pdfParse = require('pdf-parse');
    // const data = await pdfParse(fileBuffer);
    // return data.text;
    
    // For development, return placeholder text
    return `This is placeholder text extracted from a PDF document. 
    The document appears to discuss financial topics including valuation methods, 
    discounted cash flow analysis, and financial statement analysis. 
    It covers various finance concepts that would be relevant for investment banking
    and private equity interviews, including concepts about financial modeling,
    accounting principles, and market analysis techniques.`;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    
    // Return a placeholder text for development when PDF extraction fails
    return `This is placeholder text extracted from a PDF document. 
    The document appears to discuss financial topics including valuation methods, 
    discounted cash flow analysis, and financial statement analysis.`;
  }
}

export async function extractAndCleanPDFText(fileBuffer: Buffer): Promise<string> {
  const text = await extractTextFromPDF(fileBuffer);
  
  // Basic text cleaning
  return text
    .replace(/\s+/g, ' ')        // Replace multiple spaces with a single space
    .replace(/(\r\n|\n|\r)/gm, ' ') // Replace line breaks with spaces
    .trim();
} 