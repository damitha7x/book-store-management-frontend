'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navigation() {
  const pathname = usePathname();

  // Don't show navigation on home page
  if (pathname === '/') return null;

  return (
    <div className="absolute top-4 right-4 flex gap-4 items-center">
      <Link
        href="/"
        className="rounded-full p-2 hover:bg-[#f2f2f2] dark:hover:bg-[#3c799d] transition-colors"
        title="Home"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
      </Link>
    </div>
  );
}