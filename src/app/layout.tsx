import type { Metadata } from 'next';
import { Geist, Newsreader } from 'next/font/google';

import { SiteHeader } from '@/components/SiteHeader';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'latin-ext'],
});

const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin', 'latin-ext'],
});

export const metadata: Metadata = {
  title: {
    default: 'Project Compass',
    template: '%s · Project Compass',
  },
  description: 'A shared, short view of Sasha’s active projects for Melissa.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${geistSans.variable} ${newsreader.variable} h-full antialiased`}>
      <body className='min-h-full overflow-x-hidden font-sans break-words'>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
