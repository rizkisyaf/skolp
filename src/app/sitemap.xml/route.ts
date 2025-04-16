import { getAllNoteMetadata } from '@/lib/notes'; // Import function to get note slugs

// Define base URL (replace with your actual domain in production)
const URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://skolp.com';

// Define the structure for sitemap entries
interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export async function GET() {
  // Define static pages
  const staticPages = [
    '/',
    '/pricing',
    '/notes',
    '/contact',
    '/terms',
    '/privacy',
    // Add any other static pages here
  ];

  // Fetch dynamic note pages
  const notes = getAllNoteMetadata(); // Assuming this returns { slug: string, publishedTime: string }[]

  // Use the SitemapEntry type
  const sitemapEntries: SitemapEntry[] = [
    // Static pages
    ...staticPages.map((path): SitemapEntry => ({
      url: `${URL}${path}`,
      lastModified: new Date().toISOString().split('T')[0], // Use current date as lastMod
      changeFrequency: 'monthly', // Example: Add default changeFrequency
      priority: path === '/' ? 1.0 : 0.8, // Example: Add default priority
    })),
    // Dynamic note pages
    ...notes.map((note): SitemapEntry => ({
      url: `${URL}/notes/${note.slug}`,
      lastModified: note.publishedTime || new Date().toISOString().split('T')[0], // Use publishedTime if available
      changeFrequency: 'weekly', // Example: Notes change more frequently
      priority: 0.6,
    })),
  ];

  // Construct the XML sitemap string
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapEntries
    .map((entry) => `
    <url>
      <loc>${entry.url}</loc>
      <lastmod>${entry.lastModified}</lastmod>
      ${entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : ''}
      ${entry.priority ? `<priority>${entry.priority}</priority>` : ''}
    </url>`)
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
