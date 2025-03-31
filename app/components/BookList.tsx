'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import api from '@/utils/api';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  coverImage?: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message: string;
}

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books');
        console.log('API Response:', response.data);
        
        let booksData;
        if (response.data.books) {
          booksData = response.data.books;
        } else if (response.data.data) {
          booksData = response.data.data;
        } else if (Array.isArray(response.data)) {
          booksData = response.data;
        } else {
          console.error('Response structure:', response.data);
          throw new Error('Unexpected API response structure');
        }

        if (!Array.isArray(booksData)) {
          throw new Error('Books data is not an array');
        }

        setBooks(booksData);
        setError(null);
      } catch (error: unknown) {
        const apiError = error as ApiError;
        console.error('Error details:', apiError);
        setError(apiError.response?.data?.message || apiError.message || 'Failed to load books');
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading books...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  if (!books.length) {
    return <div className="text-center p-4">No books available.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto p-4">
      {books.map((book) => (
        <div key={book.id} className="bg-white dark:bg-gray-500 rounded-lg shadow-md overflow-hidden">
          {book.coverImage ? (
            <Image
              src={book.coverImage}
              alt={book.title}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
              priority={false}
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 dark:bg-gray-400 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          )}
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{book.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">By {book.author}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">{book.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}