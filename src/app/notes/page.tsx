'use client'; // Make it a client component to use hooks

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; // Import hook to read search params
import LandingHeader from "@/components/landing-header";
import LandingFooter from "@/components/landing-footer";
import SearchBar from "@/components/SearchBar"; // Import the SearchBar
// Remove direct imports of fs-dependent functions
// import { getAllNoteMetadata, searchNotesSemantic, NoteMetadata } from '@/lib/notes'; 
import type { NoteMetadata } from '@/lib/notes'; // Import only the type
import { Loader2 } from 'lucide-react'; // For loading state

export default function NotesListPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const [notes, setNotes] = useState<NoteMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Construct the API endpoint URL
        const apiUrl = query ? `/api/notes?query=${encodeURIComponent(query)}` : '/api/notes';
        
        console.log(`Fetching from: ${apiUrl}`); // Log the API URL being fetched

        const response = await fetch(apiUrl);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const fetchedNotes: NoteMetadata[] = await response.json();
        setNotes(fetchedNotes);

      } catch (err: any) {
        console.error("Error fetching notes via API:", err);
        setError(err.message || "Failed to load notes. Please try again.");
        setNotes([]); // Clear notes on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [query]); // Re-run effect when the query changes

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1 container py-12">
        <h1 className="text-3xl font-bold mb-6">Notes</h1>
        
        {/* Add the SearchBar component */}
        <div className="mb-8 max-w-xl mx-auto">
           <SearchBar />
        </div>

        {/* Display Loading / Error / Notes List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-3 text-muted-foreground">Loading notes...</span>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="space-y-6">
            {notes.length > 0 ? (
              notes.map((note) => (
                <Link key={note.slug} href={`/notes/${note.slug}`} className="block p-6 border rounded-lg hover:bg-muted transition-colors shadow-sm">
                  <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
                  {/* Use contentHint from metadata */}
                  <p className="text-muted-foreground mb-3 text-sm">{note.contentHint}</p>
                  {/* Optionally display published date or reference */}
                  <div className="text-xs text-muted-foreground/80">
                    <span>Published: {new Date(note.publishedTime).toLocaleDateString()}</span>
                    {note.reference && <span> ・ Reference: {note.reference}</span>}
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                {query ? `No notes found matching "${query}".` : "No notes found. Add some markdown files to the `/content/notes` directory."}
              </p>
            )}
          </div>
        )}
      </main>
      <LandingFooter />
    </div>
  );
} 