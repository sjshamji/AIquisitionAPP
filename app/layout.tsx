import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FirebaseAuthProvider } from "./providers/FirebaseAuthProvider";
import { UserDataProvider } from "./providers/UserDataProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AIquisition - Investment Banking Interview Prep",
  description: "AI-powered investment banking interview preparation platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FirebaseAuthProvider>
          <UserDataProvider>
            {children}
          </UserDataProvider>
        </FirebaseAuthProvider>
      </body>
    </html>
  );
} 