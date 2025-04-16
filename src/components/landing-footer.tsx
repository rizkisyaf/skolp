"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import { Input } from "@/components/ui/input"; // Example import if needed
// import { Button } from "@/components/ui/button"; // Example import if needed

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
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
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {currentYear} Skolp. Built by <Link href="https://twitter.com/kisra_fistya" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">@kisra_fistya</Link>.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/contact">Contact</Link> 
          {/* Add social links here if needed */}
        </div>
      </div>
    </footer>
  );
}
