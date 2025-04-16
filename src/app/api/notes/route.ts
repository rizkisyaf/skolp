import { NextResponse } from 'next/server';
import { getAllNoteMetadata, searchNotesSemantic, NoteMetadata } from '@/lib/notes';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';

  try {
    let notes: NoteMetadata[];

    if (query) {
      console.log(`API route searching for: "${query}"`); // Add log
      // IMPORTANT: searchNotesSemantic uses transformers.js, which CAN run client-side
      // but file reading MUST be server-side. Here it's okay as API routes are server-side.
      notes = await searchNotesSemantic(query);
    } else {
      console.log("API route fetching all notes."); // Add log
      notes = getAllNoteMetadata();
    }

    return NextResponse.json(notes);

  } catch (error) {
    console.error("Error in /api/notes:", error);
    // Return a generic error response
    return NextResponse.json(
      { message: 'Failed to fetch notes' }, 
      { status: 500 }
    );
  }
} 