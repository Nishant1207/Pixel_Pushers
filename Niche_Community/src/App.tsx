import React from 'react';
import { Navbar } from './components/layout/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Niche</h1>
          <p className="mt-2 text-gray-600">Your community platform for shared interests.</p>
        </div>
      </main>
    </div>
  );
}

export default App;