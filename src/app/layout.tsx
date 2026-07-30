import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '../context/AppContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BrainTether - Calmer ADHD Management & Neurodivergent Productivity',
  description: 'Human-centered personal productivity, stress point task management, habit streaks, body doubling, and mood analytics.',
  keywords: ['ADHD productivity', 'neurodivergent workflow', 'body doubling', 'stress points', 'habit tracker', 'mood correlation'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-zen-bg-light dark:bg-zen-bg-dark`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
