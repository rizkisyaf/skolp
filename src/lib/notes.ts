import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'; // Parses YAML front matter

// Define a basic type for the expected pipeline function signature
interface EmbeddingPipeline {
  (text: string, options: { pooling: string; normalize: boolean }): Promise<{ data: ArrayLike<number> }>;
}

// --- Model Loading (Important: This might be slow on first run) ---
// We'll use a small, efficient model suitable for sentence embeddings.
// Cache the pipeline instance for performance.
let pipelineInstance: EmbeddingPipeline | null = null;
const modelName = 'Xenova/all-MiniLM-L6-v2';

async function getEmbeddingPipeline(): Promise<EmbeddingPipeline> {
  if (!pipelineInstance) {
    const { pipeline } = await import('@xenova/transformers');
    // Allow local models if you download them, otherwise it fetches from Hugging Face Hub.
    // Consider disabling remote models in production if not desired.
    pipelineInstance = (await pipeline('feature-extraction', modelName, {
       quantized: false // Use false for better accuracy, true for smaller size/faster load
    })) as EmbeddingPipeline;
    console.log('Embedding pipeline loaded.');
  }
  return pipelineInstance;
}

// --- Helper function for cosine similarity ---
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (!vecA || !vecB || vecA.length !== vecB.length) {
    return 0;
  }
  let dotProduct = 0.0;
  let normA = 0.0;
  let normB = 0.0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) {
    return 0; // Avoid division by zero
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Define the directory where notes are stored
// Correct path assuming process.cwd() is the project root (skolp-com)
const notesDirectory = path.join(process.cwd(), 'content/notes');

export type NoteMetadata = {
  slug: string;
  title: string;
  contentHint: string;
  publishedTime: string;
  reference: string;
  website?: string; // Add optional website field
};

export type NoteData = NoteMetadata & {
  content: string; // The main markdown content
  embedding?: number[]; // Optional: Add embedding field
};

// Function to get metadata for all notes, sorted by date (newest first)
export function getAllNoteMetadata(): NoteMetadata[] {
  try {
    const fileNames = fs.readdirSync(notesDirectory);
    const allNotesData = fileNames.map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(notesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the slug
      return {
        slug,
        ...(matterResult.data as { title: string; contentHint: string; publishedTime: string; reference: string }),
      };
    });

    // Sort notes by publishedTime (date)
    return allNotesData.sort((a, b) => {
      if (a.publishedTime < b.publishedTime) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error("Error reading notes directory:", error);
    return []; // Return empty array on error
  }
}

// Function to get full data for a single note by its slug
export function getNoteBySlug(slug: string): NoteData | null {
  const fullPath = path.join(notesDirectory, `${slug}.md`);
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the slug and content
    return {
      slug,
      content: matterResult.content,
      ...(matterResult.data as { title: string; contentHint: string; publishedTime: string; reference: string }),
    };
  } catch (error) {
    // If file not found or other error, return null
    console.error(`Error reading note ${slug}:`, error);
    return null;
  }
}

// --- Function to get ALL notes with content (needed for embedding) ---
function getAllNotesData(): NoteData[] {
  const fileNames = fs.readdirSync(notesDirectory);
  const allNotesData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(notesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      contentHint: data.contentHint,
      publishedTime: data.publishedTime,
      reference: data.reference,
      website: data.website || null, // Read website field, default to null if missing
      content: content,
    } as NoteData;
  });
  return allNotesData;
}

// --- NEW Semantic Search Function ---
export async function searchNotesSemantic(query: string, similarityThreshold: number = 0.3): Promise<NoteMetadata[]> {
  if (!query || query.trim() === '') {
    return getAllNoteMetadata(); // Return all if query is empty
  }

  console.log(`Semantic search for: "${query}"`);
  const embedder: EmbeddingPipeline = await getEmbeddingPipeline();
  const allNotes = getAllNotesData(); // Get notes with content

  // 1. Embed the query
  const queryEmbeddingOutput = await embedder(query, { pooling: 'mean', normalize: true });
  const queryEmbedding: number[] = Array.from(queryEmbeddingOutput.data);

  // 2. Embed all notes (or retrieve pre-computed) - Doing on the fly here
  //    In a real app, compute and store embeddings separately.
  const notesWithEmbeddings = await Promise.all(allNotes.map(async (note) => {
     // Embed a combination of title and content for better relevance
    const textToEmbed = `${note.title}. ${note.contentHint}. ${note.content.substring(0, 500)}`; // Limit content length for embedding
    const noteEmbeddingOutput = await embedder(textToEmbed, { pooling: 'mean', normalize: true });
    note.embedding = Array.from(noteEmbeddingOutput.data);
    return note;
  }));


  // 3. Calculate similarities
  const notesWithSimilarity = notesWithEmbeddings.map(note => {
    const similarity = cosineSimilarity(queryEmbedding, note.embedding!);
    return { ...note, similarity };
  });

  // 4. Filter and Sort
  const relevantNotes = notesWithSimilarity
    .filter(note => note.similarity >= similarityThreshold)
    .sort((a, b) => b.similarity - a.similarity); // Sort by descending similarity

  console.log(`Found ${relevantNotes.length} relevant notes.`);

  // Return only the metadata for the relevant notes
  return relevantNotes.map(({ content, embedding, similarity, ...metadata }) => {
    // content, embedding, and similarity are unused *in the final return object*,
    // but were necessary for calculation. This is expected.
    return metadata; 
  });
} 