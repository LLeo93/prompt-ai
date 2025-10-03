import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  debounceTime?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Cerca...',
  onSearch,
  debounceTime = 300,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query);
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [query, onSearch, debounceTime]);

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder={placeholder}
      className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-slate-800 text-gray-200 placeholder-gray-400"
    />
  );
};

export default SearchBar;
