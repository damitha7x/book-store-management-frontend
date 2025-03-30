import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import Navigation from './components/Navigation'
import Footer from './components/Footer';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Book Management System',
  description: 'Manage your book collection',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <AuthProvider>
        <Navigation />
        {children}
        <Footer />
      </AuthProvider>
      </body>
    </html>
  )
}