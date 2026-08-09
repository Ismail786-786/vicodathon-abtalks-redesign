import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MobileFrame } from '@/components/mobile-frame';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ABTalks — 60-Day Coding Challenge for Indian College Students',
  description:
    'Code for 60 Days. Build Consistency. Get Hired. Join 12,000+ Indian college students in a free daily coding challenge that builds your GitHub and LinkedIn portfolio.',
  openGraph: {
    title: 'ABTalks — 60-Day Coding Challenge',
    description: 'Code for 60 Days. Build Consistency. Get Hired.',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#020617',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <MobileFrame>{children}</MobileFrame>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
