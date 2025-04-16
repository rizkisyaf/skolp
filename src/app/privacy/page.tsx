"use client"; // Not strictly necessary, but consistent

import LandingHeader from "@/components/landing-header";
import LandingFooter from "@/components/landing-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1">
        <section className="container py-24 sm:py-32">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center">
                  Privacy <span className="text-primary">Policy</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-8 border rounded-md bg-muted">
                  <p className="text-muted-foreground text-lg">
                    Our Privacy Policy is currently being updated.
                  </p>
                  <p className="mt-4 text-sm">
                    We are committed to protecting your privacy. Please check back soon for the detailed policy. Thank you for your patience.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
} 