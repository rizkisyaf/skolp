'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Sparkles, Loader2 } from 'lucide-react'; // Import Loader2 for spinner
import { track } from '@vercel/analytics/react'; // Import track function

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  
  const [inputValue, setInputValue] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();

  // Keep this effect to potentially pre-fill from URL on initial load or back/forward
  useEffect(() => {
    setInputValue(initialQuery);
  }, [initialQuery]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = inputValue.trim();
    
    // Track the search event before starting the transition
    if (query) {
      track('SearchPerformed', { query: query, context: 'notes' }); // Added context
    }

    startTransition(() => {
      if (query) {
        // Navigate to the notes page with the query
        router.push(`/notes?query=${encodeURIComponent(query)}`);
      } else {
        // Navigate to the base notes page if query is cleared
        router.push('/notes');
      }
      // Clear the input optimistically
      setInputValue(''); 
    });
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center rounded-full bg-slate-200 shadow-md overflow-hidden">
      <span className="pl-4 pr-2 text-gray-500">
        <Sparkles size={20} />
      </span>
      <input 
        type="text" 
        name="query"
        placeholder="What do you wanna know?" 
        value={inputValue} // Input is now fully controlled, will clear when state changes
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full py-3 pr-10 pl-2 bg-slate-200 text-gray-800 placeholder-gray-500 focus:outline-none text-lg"
        disabled={isPending} // Disable input while loading
      />
      {/* Conditional Loading Spinner / Search Button */}
      <button 
        type="submit" 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
        disabled={isPending}
        aria-label={isPending ? "Searching" : "Search"}
      >
        {isPending ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <Search size={20} />
        )}
      </button>
    </form>
  );
} 