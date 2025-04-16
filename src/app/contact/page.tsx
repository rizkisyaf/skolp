"use client"; // Add if client-side interactions are needed (e.g., form handling)

import LandingHeader from "@/components/landing-header";
import LandingFooter from "@/components/landing-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "lucide-react";
// import { Input } from "@/components/ui/input"; // Removed import
// import { Textarea } from "@/components/ui/textarea"; // Removed import
// import { Button } from "@/components/ui/button"; // Removed import

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1">
        <section className="container py-24 sm:py-32">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center">
                  Contact <span className="text-primary">Us</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground text-center">
                  Have questions or need help with the Enterprise plan? Reach out!
                </p>
                {/* Placeholder for contact info/form */}
                <div className="text-center p-8 border rounded-md bg-muted space-y-4">
                  <p className="text-muted-foreground">
                    Our contact form is under construction. 
                  </p>
                  <p className="text-sm">
                     For general inquiries, please email us at <a href="mailto:support@skolp.com" className="text-primary hover:underline">support@skolp.com</a>.
                  </p>
                  <p className="text-sm">
                    Alternatively, you can reach out to us on X (formerly Twitter): <a href="https://twitter.com/kisra_fistya" target="_blank" rel="noreferrer" className="text-primary hover:underline">@kisra_fistya</a>.
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
