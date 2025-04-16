import React, { HTMLAttributes, ClassAttributes } from 'react';
import { getNoteBySlug, NoteData } from '@/lib/notes'; // Import NoteData type
import ReactMarkdown, { ExtraProps } from 'react-markdown';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ShareButtons from '@/components/ShareButtons';
import Link from 'next/link'; // Import Link
import SiteHeader from '@/components/SiteHeader'; // Import the header
import CodeBlockWrapper from '@/components/CodeBlockWrapper'; // Import the new wrapper

// Define props using slug
type NotePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Note: Need to also implement generateStaticParams if using SSG/ISR later

// Define type for code component props including inline
type CodeProps = ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement> & ExtraProps & {
  inline?: boolean;
};

// Generate metadata for better social sharing
export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const awaitedParams = await params; // Await params first
  const note = getNoteBySlug(awaitedParams.slug);
  if (!note) return {};

  // Use NoteData type hint
  const typedNote = note as NoteData;

  return {
    title: typedNote.title,
    description: typedNote.contentHint,
    openGraph: {
      title: typedNote.title,
      description: typedNote.contentHint,
      type: 'article',
      publishedTime: typedNote.publishedTime,
    },
    twitter: {
      card: 'summary_large_image',
      title: typedNote.title,
      description: typedNote.contentHint,
    },
  };
}

// Function to generate JSON-LD for Article schema
const generateArticleSchema = (note: NoteData) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skolp.com';
  const noteUrl = `${siteUrl}/notes/${note.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article", // Or BlogPosting
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": noteUrl
    },
    "headline": note.title,
    "description": note.contentHint,
    "datePublished": note.publishedTime, // Assumes YYYY-MM-DD format
    // "dateModified": note.modifiedTime, // Add if you track modifications
    "author": { // Define Author
      "@type": "Organization", // Or "Person" if it's an individual
      "name": "Skolp" // Your organization or author name
      // "url": siteUrl // Optional URL for author/org
    },
    "publisher": { // Define Publisher (often same as Author for blogs)
      "@type": "Organization",
      "name": "Skolp",
      "logo": { // Optional: Add logo URL
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.svg` // Assuming logo is in public folder
      }
    },
    // Optional: Add image if you have one per article
    // "image": [`${siteUrl}/path/to/article-image.jpg`],
  };
  return JSON.stringify(schema);
};

export default async function NotePage({ params }: NotePageProps) {
  // Properly await the params
  const { slug } = await params;

  // Fetch the note data using the slug
  const note = getNoteBySlug(slug); // Use getNoteBySlug

  // If note not found, trigger a 404 page
  if (!note) {
    notFound();
  }

  // Use NoteData type hint
  const typedNote = note as NoteData;

  // Generate current URL
  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skolp.com'}/notes/${slug}`;

  return (
    <> {/* Use Fragment to allow multiple top-level elements (main and script) */}
      {/* Add the JSON-LD script for Article schema */}
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateArticleSchema(typedNote) }}
          key="article-schema" // Add a key for React reconciliation
      />
      <main className="flex min-h-screen flex-col items-center p-6 sm:p-12 lg:p-24 bg-[#0c0c0c] text-gray-100">
        {/* Add Site Header Here */}
        <SiteHeader />
        
        <div className="w-full max-w-4xl">
          {/* Title Section - Removed Share Buttons */}
          <h1 className="text-4xl font-bold text-gray-50 mb-8">{typedNote.title}</h1>
          
          {/* Metadata and Sharing Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 text-gray-400">
            {/* Metadata Text */}
            <div className="mb-4 sm:mb-0">
              <p className="text-sm">Published: {new Date(typedNote.publishedTime).toLocaleDateString()}</p>
              <p className="text-sm">Reference: {typedNote.reference}</p>
            </div>
            {/* Share Buttons - Moved Here */}
            <ShareButtons title={typedNote.title} url={currentUrl} />
          </div>
          
          {/* TLDR Section */}
          <div className="mb-8 bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-3">TLDR</h2>
            <p className="text-gray-300">{typedNote.contentHint}</p>
          </div>
          
          {/* Render Markdown Content */}
          <div className="prose prose-invert prose-lg max-w-none bg-[#1a1a1a] p-8 rounded-lg border border-gray-800 shadow-xl">
            <article className="space-y-6">
              <ReactMarkdown
                components={{
                  h1: ({ ...props}) => <h1 className="text-3xl font-bold text-gray-100 mb-6" {...props} />,
                  h2: ({ ...props}) => <h2 className="text-2xl font-semibold text-gray-200 mt-8 mb-4" {...props} />,
                  p: ({ ...props}) => <p className="text-gray-300 leading-relaxed mb-4" {...props} />,
                  ul: ({ ...props}) => <ul className="list-disc list-inside space-y-2 text-gray-300" {...props} />,
                  li: ({ ...props}) => <li className="ml-4" {...props} />,
                  blockquote: ({ ...props}) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-400" {...props} />
                  ),
                  strong: ({ ...props}) => <strong className="text-gray-100 font-semibold" {...props} />,
                  code: ({ inline, className, children, ...props}: CodeProps) => {
                    const codeStyle = inline 
                      ? "px-1 py-0.5 bg-gray-700 rounded-sm font-mono text-sm text-gray-200"
                      : "font-mono text-sm text-gray-300";
                    
                    return (
                      <code className={`${codeStyle} ${className || ''}`} {...props}>
                        {children}
                      </code>
                    );
                  },
                  pre: ({ node, ...props }) => <CodeBlockWrapper {...props} />,
                  a: ({ node, ...props }) => (
                    <a 
                      className="text-blue-400 hover:text-blue-300 hover:underline"
                      target="_blank" 
                      rel="noopener noreferrer"
                      {...props}
                    />
                  )
                }}
              >
                {typedNote.content}
              </ReactMarkdown>
            </article>
          </div>
          
          {/* Back Link - Use Next.js Link */}
          <div className="mt-8">
            <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
              &larr; Back to list
            </Link>
          </div>
        </div>
      </main>
    </>
  );
} 