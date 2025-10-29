import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    onSearch(input.trim());
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search city..."
        className="flex-1 px-4 py-2 rounded border bg-white dark:bg-gray-800"
      />
      <button className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
    </form>
  );
}
