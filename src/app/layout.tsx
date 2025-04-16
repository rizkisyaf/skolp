import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
// Import a ThemeProvider if you plan to support dark mode later
// import { ThemeProvider } from "@/components/theme-provider"; 

const inter = Inter({ subsets: ["latin"] });

const siteTitle = "Skolp - Instantly Create MCP Tools from Any API";
const siteDescription = "Skolp scans your API code, lets you select endpoints, and generates ready-to-use bridge packages for LLMs and agents.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://skolp.com"; // Ensure this env var is set
const ogImageUrl = `${siteUrl}/og-image.png`; // Assuming og-image.png is in /public

// Update Metadata from Brand Guide
export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: '%s | Skolp',
  },
  description: siteDescription,
  // Open Graph Metadata
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: 'Skolp',
    images: [
      {
        url: ogImageUrl,
        width: 1200, // Specify image dimensions for better previews
        height: 630,
        alt: 'Skolp Logo and Mascot',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  // Twitter Card Metadata
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    // Optional: Add creator handle if you have one
    creator: '@ksira_fistya',
    images: [ogImageUrl], // Must be an absolute URL
  },
  // Optional: Add keywords if desired
  keywords: ['API', 'LLM', 'Agent', 'Bridge', 'MCP', 'Tools', 'Automation', 'FastAPI'],
  // Optional: Robots meta tag (Next.js usually handles this well by default)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Optional: Icons and Manifest
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

// Removed generateWebSiteSchema for simplicity, can be added back if needed

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Remove dark class, set light theme defaults
    <html lang="en"> 
      <head>
        {/* No need for manifest link here if defined in metadata */}
        {/* Remove dark theme-color */}
        {/* <meta name="theme-color" content="#0c0c0c" /> */}
        {/* Remove schema if not needed for landing page initially */}
        {/* <script ... /> */}
      </head>
      {/* Apply light background and default text color from Tailwind config */}
      <body className={`${inter.className} bg-background text-foreground`}>
        {/* Optional: Wrap with ThemeProvider if adding dark mode later */}
        {/* <ThemeProvider attribute="class" defaultTheme="light"> */} 
          {children}
          <Analytics />
        {/* </ThemeProvider> */} 
      </body>
    </html>
  );
}
