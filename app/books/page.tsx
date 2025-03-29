'use client';
import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
}

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publicationYear: new Date().getFullYear(),
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchBooks();
  }, [isAuthenticated]);

  const fetchBooks = async () => {
    try {
      const response = await api.get('/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBook) {
        await api.put(`/books/${editingBook.id}`, formData);
        setSuccessMessage('Book updated successfully!');
      } else {
        await api.post('/books', formData);
        setSuccessMessage('Book added successfully!');
      }
      fetchBooks();
      setIsAddingBook(false);
      setEditingBook(null);
      setFormData({
        title: '',
        author: '',
        genre: '',
        publicationYear: new Date().getFullYear(),
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg">
          {successMessage}
        </div>
      )}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Books</h1>
        <div className="space-x-4">
          <button
            onClick={() => setIsAddingBook(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Book
          </button>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {(isAddingBook || editingBook) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {editingBook ? 'Edit Book' : 'Add New Book'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Genre"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Publication Year"
                value={formData.publicationYear}
                onChange={(e) => setFormData({ ...formData, publicationYear: parseInt(e.target.value) })}
                className="w-full p-2 border rounded"
              />
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {editingBook ? 'Update' : 'Add'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingBook(false);
                    setEditingBook(null);
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">{book.title}</h3>
            <p className="text-gray-600">Author: {book.author}</p>
            <p className="text-gray-600">Genre: {book.genre}</p>
            <p className="text-gray-600">Year: {book.publicationYear}</p>
            <div className="mt-4 space-x-4">
              <button
                onClick={() => {
                  setEditingBook(book);
                  setFormData({
                    title: book.title,
                    author: book.author,
                    genre: book.genre,
                    publicationYear: book.publicationYear,
                  });
                }}
                className="text-blue-500 hover:text-blue-700"
              >
                Edit
              </button>
              <button
                onClick={async () => {
                  if (window.confirm('Are you sure you want to delete this book?')) {
                    try {
                      await api.delete(`/books/${book.id}`);
                      fetchBooks();
                      setSuccessMessage('Book deleted successfully!');
                      setTimeout(() => {
                        setSuccessMessage('');
                      }, 3000);
                    } catch (error) {
                      console.error('Error deleting book:', error);
                    }
                  }
                }}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}