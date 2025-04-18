"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button'; // Use the alias now that shadcn is init

export default function LandingHeader() {
  // Placeholder links - adjust as needed
  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/notes", label: "Notes" }, // Link to the blog/notes section
    { href: "/docs/introduction", label: "Docs", target: "_blank" },
  ];

  // Determine if in production
  const isProduction = process.env.NODE_ENV === 'production';

  // Original URLs
  const originalLoginUrl = process.env.NEXT_PUBLIC_APP_LOGIN_URL || "https://app.skolp.com/api/auth/login/github"; // Changed back to login endpoint
  const waitlistUrl = "/waitlist";

  // Conditional URL for the main header button
  const headerActionUrl = isProduction ? waitlistUrl : originalLoginUrl;
  const headerActionLabel = isProduction ? "Join Waitlist" : "Launch App"; // Change label too

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image 
            src="/skolp-logo.svg" // Use logo from brand guide
            alt="Skolp Logo" 
            width={24}
            height={24}
            className="h-6 w-6"
          />
          <span className="font-bold">Skolp</span>
        </Link>
        
        {/* Main Nav */}
        <nav className="hidden flex-1 gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.target}
              className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions - Use conditional URL and Label */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button 
            asChild 
            className="bg-orange-400 hover:bg-orange-500 text-primary-foreground"
          >
            <Link href={headerActionUrl}>{headerActionLabel}</Link> 
          </Button>
        </div>
      </div>
    </header>
  );
} 