"use client"
import React, { useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import Button from './ui/button';
const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const handleSearchClick = () => {
    performSearch();
  };

  const performSearch = () => {

      const encodedQuery = encodeURIComponent(searchQuery);
      router.push(`products?name=${encodedQuery}`);
      setSearchQuery('');
  };
  return (
    <div className="hidden sm:flex ml-auto  items-center gap-x-2">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
        // onKeyPress={handleKeyPress}
        className=" flex items-center border border-gray-300 px-4 py-2 rounded-l-md focus:outline-none focus:ring focus:border-blue-300"
      />
      <Button
        onClick={handleSearchClick}
        className="flex items-center bg-black text-white px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-300 ml-2"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
