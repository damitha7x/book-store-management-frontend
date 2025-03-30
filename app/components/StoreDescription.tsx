export default function StoreDescription() {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        Welcome to Our Bookstore
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Discover a world of knowledge and imagination in our carefully curated collection of books. 
        From bestsellers to rare finds, we offer a diverse selection to satisfy every reader&apos;s taste.
      </p>
      <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">📚 Extensive Collection</span>
        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">🌟 Quality Selections</span>
        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">📖 Various Genres</span>
      </div>
    </div>
  );
}