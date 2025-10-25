import type { Metadata } from 'next';
import { Poppins, PT_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/contexts/auth-context';
import { TranslationProvider } from '@/contexts/translation-context';
<<<<<<< HEAD
=======
import { ClientProvider } from '@/components/providers/client-provider';
import { Chatbot } from '@/components/chatbot/chatbot';
>>>>>>> 59c34d88d5eb90763502272d7a37b82bcfdacde3

export const metadata: Metadata = {
  title: 'BharatLink – Rural Skill-to-Work Network',
  description: 'Connecting India’s Grassroots Talent to Digital Opportunities.',
};

const fontHeadline = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-headline',
});

const fontBody = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/logo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased', fontHeadline.variable, fontBody.variable)} suppressHydrationWarning>
<<<<<<< HEAD
        <TranslationProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </TranslationProvider>
=======
        <ClientProvider>
          <TranslationProvider>
            <AuthProvider>
              {children}
              <Toaster />
              <Chatbot />
            </AuthProvider>
          </TranslationProvider>
        </ClientProvider>
>>>>>>> 59c34d88d5eb90763502272d7a37b82bcfdacde3
      </body>
    </html>
  );
}
