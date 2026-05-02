import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PropVest — Own Nigerian Real Estate From ₦100,000',
  description:
    'Invest in verified Nigerian properties by trusted developers. Earn quarterly rent. Sell anytime. Starting from ₦100,000.',
  keywords: [
    'PropVest',
    'fractional real estate',
    'Nigeria property investment',
    'real estate investing',
    'passive income Nigeria',
    'Abuja real estate',
  ],
  openGraph: {
    title: 'PropVest — Own Nigerian Real Estate From ₦100,000',
    description:
      'Invest in verified Nigerian properties by trusted developers. Earn quarterly rent. Sell anytime.',
    type: 'website',
    locale: 'en_NG',
    siteName: 'PropVest',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PropVest — Own Nigerian Real Estate From ₦100,000',
    description:
      'Invest in verified Nigerian properties by trusted developers. Earn quarterly rent. Sell anytime.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
