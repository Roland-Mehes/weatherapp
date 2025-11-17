import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import './styles/globals.css';

import Navbar from './components/navbar/Navbar';
import ToastProvider from './components/ToastProvider';

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'A simple weather application built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.className} `}>
        <Navbar />
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
