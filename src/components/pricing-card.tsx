"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingCardProps {
  planName: string;
  price: string;
  priceDescription?: string; // e.g., "/ month"
  description: string;
  features: string[];
  ctaLabel: string;
  ctaLink: string;
  isPopular?: boolean; // To highlight a specific plan
}

export default function PricingCard({ 
  planName, 
  price, 
  priceDescription = "/ month", 
  description, 
  features, 
  ctaLabel, 
  ctaLink,
  isPopular = false
}: PricingCardProps) {
  return (
    <Card className={`flex flex-col ${isPopular ? 'border-primary shadow-lg' : ''}`}> 
      <CardHeader className={isPopular ? 'bg-muted/30' : ''}>
        <CardTitle>{planName}</CardTitle>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Custom" && <span className="text-sm text-muted-foreground">{priceDescription}</span>}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-3 pt-4"> {/* Use flex-1 to push footer down */}
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <Check className="w-4 h-4 mr-2 mt-1 text-primary flex-shrink-0" />
            <span className="text-sm text-muted-foreground">{feature}</span>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild variant={isPopular ? 'default' : 'outline'}>
          <Link href={ctaLink}>{ctaLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
} 