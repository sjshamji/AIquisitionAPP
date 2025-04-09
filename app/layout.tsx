import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import { FirebaseAuthProvider } from "./providers/FirebaseAuthProvider";
import { UserDataProvider } from "./providers/UserDataProvider";
import { ThemeProvider } from "./providers/ThemeProvider";

export const metadata: Metadata = {
  title: 'AIquisition',
  description: 'Master investment banking interviews with AI-powered practice and feedback',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-900 antialiased">
        <ThemeProvider>
          <FirebaseAuthProvider>
            <UserDataProvider>
              {children}
            </UserDataProvider>
          </FirebaseAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 