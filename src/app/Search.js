'use client';
import { useRouter, useSearchParams } from 'next/navigation';

function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSearch(searchQuery) {
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set('query', searchQuery);
    } else {
      params.delete('query');
    }
    router.push(`?${params.toString()}`);
  }

  return (
    <div>
      <input
        type="text"
        id="search-navbar"
        className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search..."
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
}

export default Search;
