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
- Firebase project with Authentication and Firestore enabled

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

4. Set up Firebase credentials:
   - Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Enable Authentication and Firestore
   - Generate a service account key from Project Settings > Service Accounts > Generate New Private Key
   - Copy the downloaded JSON file to `backend/serviceAccountKey.json`
   - **IMPORTANT**: Never commit this file to version control. It's already added to `.gitignore`

5. Start the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Firebase Authentication, Firestore
- **AI Integration**: OpenAI API
- **PDF Processing**: pdf-parse

## License

This project is licensed under the MIT License. 