# AIquisition - Finance Interview Prep Platform

AI-powered application that helps students prepare for technical finance interviews with adaptive questions, document-based learning, and personalized feedback.

## Features

- **Interview Practice Engine**: Practice with multiple-choice and open-ended questions across core finance topics.
- **Document-Based Learning**: Upload study materials and get personalized questions from your documents.
- **AI-Powered Feedback**: Receive detailed feedback on your answers with insights on technical accuracy, clarity, and depth.
- **Modern UI**: Clean, intuitive interface with a focus on user experience.

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/aiquisition.git
   cd aiquisition
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **AI Integration**: OpenAI API
- **PDF Processing**: pdf-parse

## License

This project is licensed under the MIT License. 