import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from './components/Footer';
import Settings from './components/Settings';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AIquisition',
  description: 'Learn AI concepts through interactive questions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white min-h-screen`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end py-4">
            <Settings />
          </div>
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
} 