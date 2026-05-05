import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';

import './globals.css';
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: {
    template: '%s | InternTrack',
    default: 'InternTrack - Internship Application Manager',
  },
  description: 'A centralized and intuitive web application to help students organize and track their internship and job searches effectively.',
  keywords: ['internship', 'job tracker', 'application manager', 'student career', 'PV247'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}