'use client';

import React from 'react';
import { Share2, Twitter } from 'lucide-react';
import { ShareIcon } from '@heroicons/react/24/outline';
import toast, { Toaster } from 'react-hot-toast';
import { track } from '@vercel/analytics/react';

type ShareButtonsProps = {
  title: string;
  url: string;
};

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`${title}\n\n${url}`)}`;

  const handleCopyLink = async () => {
    track('ShareButtonClicked', { method: 'Copy Link', title: title, url: url });
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied!', {
        duration: 2000,
        position: 'bottom-center',
        style: {
          background: '#333',
          color: '#fff',
          borderRadius: '8px',
        },
      });
    } catch (err) {
      toast.error('Failed to copy', {
        duration: 2000,
        position: 'bottom-center',
        style: {
          background: '#333',
          color: '#fff',
          borderRadius: '8px',
        },
      });
      console.error('Failed to copy link:', err);
    }
  };

  const handleSocialShareClick = (method: 'X' | 'WhatsApp') => {
    track('ShareButtonClicked', { method: method, title: title, url: url });
  };

  return (
    <>
      <div className="flex items-center space-x-3">
        <button 
          onClick={handleCopyLink}
          aria-label="Copy link"
          className="p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200 transition-colors"
        >
          <Share2 size={18} />
        </button>
        
        <a
          href={twitterShareUrl}
          target="_blank"
          aria-label="Share on X"
          rel="noopener noreferrer"
          onClick={() => handleSocialShareClick('X')}
          className="p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200 transition-colors"
        >
          <Twitter size={18} />
        </a>
        
        <a
          href={whatsappShareUrl}
          target="_blank"
          aria-label="Share on WhatsApp"
          rel="noopener noreferrer"
          onClick={() => handleSocialShareClick('WhatsApp')}
          className="p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200 transition-colors"
        >
          <ShareIcon className="h-[18px] w-[18px]" />
        </a>
      </div>
      <Toaster />
    </>
  );
}