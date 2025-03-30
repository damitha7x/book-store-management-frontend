export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-md mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">About Us</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              We are dedicated to bringing you the best collection of books, 
              making knowledge and entertainment accessible to everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <li><a href="/privacy" className="hover:text-gray-900 dark:hover:text-white">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-gray-900 dark:hover:text-white">Terms of Service</a></li>
              <li><a href="/contact" className="hover:text-gray-900 dark:hover:text-white">Contact Us</a></li>
            </ul>
          </div>

          {/* Developer Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Developer</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Developed by Damitha Bandara<br />
              Full Stack Developer
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Book Store Management. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}