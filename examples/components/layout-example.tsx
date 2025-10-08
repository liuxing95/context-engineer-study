// Example: Next.js Layout Component Pattern
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function ExampleLayout({ 
  children, 
  title = 'Context Engineer Study',
  description = 'Token counting and context engineering utilities'
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-semibold text-gray-900">
              {title}
            </h1>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <a href="/" className="text-gray-600 hover:text-gray-900">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/token-counter" className="text-gray-600 hover:text-gray-900">
                    Token Counter
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {description && (
          <div className="mb-8">
            <p className="text-gray-600">{description}</p>
          </div>
        )}
        {children}
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-500 text-sm">
            Context Engineer Study - Token Counting Utilities
          </p>
        </div>
      </footer>
    </div>
  );
}