import Image from "next/image";
import BookList from './components/BookList';
import StoreDescription from './components/StoreDescription';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Navigation buttons with home icon */}
      <div className="absolute top-4 right-4 flex gap-4 items-center">
        <a
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
        </a>
        <a
          href="/login"
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#3c799d] hover:border-transparent font-medium text-sm px-4 h-10"
        >
          Login
        </a>
        <a
          href="/register"
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm px-4 h-10"
        >
          Sign Up
        </a>
      </div>

      <main className="flex flex-col gap-[32px] row-start-2 items-center w-full">
        <StoreDescription />
        <h2 className="text-3xl font-bold text-center mb-8">Featured Books</h2>
        <BookList />
      </main>
    </div>
  );
}
