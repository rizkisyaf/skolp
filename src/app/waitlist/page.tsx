"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Success! You\ve been added to the waitlist.');
        setEmail(''); // Clear input on success
      } else {
        setStatus('error');
        setMessage(result.error || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error("Waitlist submission error:", error);
      setStatus('error');
      setMessage('Could not connect to the server. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted/30 p-6">
      <div className="max-w-md w-full text-center bg-card p-8 rounded-xl shadow-lg border">
        <h1 className="text-3xl font-bold text-primary mb-4">Skolp App Coming Soon!</h1>
        <p className="text-muted-foreground mb-6">
          We're hard at work building the Skolp application. Enter your email below to join the waitlist and be notified when we launch.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === 'loading' || status === 'success'}
            className="text-center"
          />
          <Button 
            type="submit" 
            className="w-full"
            disabled={status === 'loading' || status === 'success'}
          >
            {status === 'loading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {status === 'success' ? 'Joined!' : 'Join Waitlist'}
          </Button>
        </form>

        {message && (
          <div className={`mt-4 text-sm flex items-center justify-center ${status === 'success' ? 'text-green-600' : 'text-destructive'}`}>
            {status === 'success' && <CheckCircle className="mr-2 h-4 w-4" />}
            {status === 'error' && <AlertCircle className="mr-2 h-4 w-4" />}
            {message}
          </div>
        )}
      </div>
      {/* Optional: Link back to main site */}
      {/* <a href="https://skolp.com" className="mt-8 text-sm text-muted-foreground hover:text-primary">Back to skolp.com</a> */}
    </div>
  );
} 