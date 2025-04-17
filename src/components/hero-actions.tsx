"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Youtube, Link as LinkIcon, Check as CheckIcon } from 'lucide-react';
import Link from 'next/link';

interface HeroActionsProps {
  loginUrl: string;
}

// Placeholder - Replace with your actual YouTube Video ID
const YOUTUBE_VIDEO_ID = 'dQw4w9WgXcQ'; 
const youtubeWatchUrl = `https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`;

export default function HeroActions({ loginUrl }: HeroActionsProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(youtubeWatchUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500); // Reset icon after 1.5 seconds
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      // Optionally provide error feedback to the user
    });
  };

  return (
    <div className="space-y-4 md:space-y-0 md:space-x-4">
      {/* Get Started Button */}
      <Button className="w-full md:w-auto" asChild>
        <Link href={loginUrl}>
          <span>Get Started</span>
        </Link>
      </Button>

      {/* Watch Demo Button & Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full md:w-auto">
            <Youtube className="mr-2 h-4 w-4" />
            <span>Watch Demo</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl p-4 sm:p-6">
          <DialogHeader className="mb-2 flex flex-col items-start space-y-2 sm:flex-row sm:justify-between sm:items-center sm:space-y-0 sm:space-x-4">
             <div className="text-left">
               <DialogTitle>Skolp Demo Video</DialogTitle>
               <DialogDescription>
                 Watch this short video to see how Skolp works.
               </DialogDescription>
             </div>
             <Button variant="ghost" size="icon" onClick={copyToClipboard} title={isCopied ? 'Copied!' : 'Copy video link'} className="self-end sm:self-center">
               {isCopied ? (
                 <CheckIcon className="h-5 w-5 text-green-600" />
               ) : (
                 <LinkIcon className="h-5 w-5" />
               )}
               <span className="sr-only">Copy link</span>
             </Button>
          </DialogHeader>
          <div className="video-container bg-black rounded-lg overflow-hidden">
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 