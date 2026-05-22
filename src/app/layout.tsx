import { Navbar } from '@/components';

import './globals.css';

export const metadata = {
  description: '3 js questions to test your knowledge',
  title: 'JS Challenge',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#21252b] text-neutral-300">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
