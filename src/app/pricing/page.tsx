"use client"; // Assuming PricingCard might need client-side interaction

import LandingHeader from "@/components/landing-header";
import LandingFooter from "@/components/landing-footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, X } from "lucide-react"; // Import icons

// Pricing Data (Keep the detailed data, we'll map it)
const pricingTiers = [
  {
    planName: "Free",
    price: "$0",
    priceFrequency: "forever",
    description: "Perfect for trying out Skolp\'s core functionality on public projects.",
    ctaLabel: "Get Started for Free",
    ctaLink: process.env.NEXT_PUBLIC_APP_LOGIN_URL || "https://app.skolp.com/api/auth/login/github",
    isPopular: false,
    features: {
      reposScanned: "1-2 public/month",
      endpointsPerBridge: "5-10",
      bridgeGenerations: "1-3/month",
      privateRepos: false,
      targetUrlConfig: "Manual code edit",
      history: "None",
      customToolNames: false,
      priorityGeneration: false,
      support: "Community",
      customTemplates: false,
      teamManagement: false,
      sla: false,
      onPremise: false,
      customIntegrations: false,
    }
  },
  {
    planName: "Hobby",
    price: "$9",
    priceFrequency: "/ month",
    description: "Ideal for individual developers, students, and hobby projects.",
    ctaLabel: "Choose Hobby",
    ctaLink: process.env.NEXT_PUBLIC_APP_LOGIN_URL || "https://app.skolp.com/api/auth/login/github",
    isPopular: false,
    features: {
      reposScanned: "5-10 public & private/month",
      endpointsPerBridge: "25-30",
      bridgeGenerations: "10/month",
      privateRepos: true,
      targetUrlConfig: "In Skolp UI",
      history: "Last 5 generations",
      customToolNames: false,
      priorityGeneration: false,
      support: "Basic Email",
      customTemplates: false,
      teamManagement: false,
      sla: false,
      onPremise: false,
      customIntegrations: false,
    }
  },
  {
    planName: "Professional",
    price: "$27",
    priceFrequency: "/ month",
    description: "For professional developers and small teams needing more power.",
    ctaLabel: "Choose Pro",
    ctaLink: process.env.NEXT_PUBLIC_APP_LOGIN_URL || "https://app.skolp.com/api/auth/login/github",
    isPopular: true,
    features: {
      reposScanned: "25-50 public & private/month",
      endpointsPerBridge: "75-100",
      bridgeGenerations: "30-50/month",
      privateRepos: true,
      targetUrlConfig: "In Skolp UI",
      history: "Last 30 configurations",
      customToolNames: true,
      priorityGeneration: true,
      support: "Priority Email",
      customTemplates: false,
      teamManagement: false, // Basic Collaboration (Potential) - Keeping false for now
      sla: false,
      onPremise: false,
      customIntegrations: false,
    }
  },
  {
    planName: "Enterprise",
    price: "Custom",
    priceFrequency: "",
    description: "Tailored solutions for large organizations and complex requirements.",
    ctaLabel: "Contact Sales",
    ctaLink: "/contact",
    isPopular: false,
    features: {
      reposScanned: "Custom/Unlimited",
      endpointsPerBridge: "Custom/Unlimited",
      bridgeGenerations: "Custom/Unlimited",
      privateRepos: true,
      targetUrlConfig: "In Skolp UI",
      history: "Extended / Custom",
      customToolNames: true,
      priorityGeneration: true,
      support: "Dedicated + Account Manager",
      customTemplates: true,
      teamManagement: true,
      sla: true,
      onPremise: true, // Potential
      customIntegrations: true,
    }
  }
];

// Define the features to display in the table rows
const featureRows = [
  { key: 'price', label: 'Price' },
  { key: 'reposScanned', label: 'Repositories Scanned' },
  { key: 'endpointsPerBridge', label: 'Max Endpoints per Bridge' },
  { key: 'bridgeGenerations', label: 'Bridge Generations' },
  { key: 'privateRepos', label: 'Private Repository Support' },
  { key: 'targetUrlConfig', label: 'Target API URL Configuration' },
  { key: 'history', label: 'Generation History Access' },
  { key: 'customToolNames', label: 'Customizable Tool Names' },
  { key: 'priorityGeneration', label: 'Priority Generation Queue' },
  { key: 'support', label: 'Support Level' },
  { key: 'customTemplates', label: 'Custom Base Templates' },
  { key: 'teamManagement', label: 'Team Management & Roles' },
  { key: 'sla', label: 'Service Level Agreement (SLA)' },
  { key: 'onPremise', label: 'On-Premise Deployment Option' },
  { key: 'customIntegrations', label: 'Custom Integrations' },
];

// Helper to render feature value (Check/X for boolean, text otherwise)
const renderFeatureValue = (value: string | boolean | undefined) => {
  if (typeof value === 'boolean') {
    return value ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />;
  }
  return value || '-'; // Display '-' if undefined or empty
};

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1">
        <section id="pricing" className="container py-16 sm:py-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Compare Our <span className="text-primary">Plans</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find the perfect fit for your needs, from individual projects to large-scale enterprise deployments.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                    Feature
                  </th>
                  {pricingTiers.map((tier) => (
                    <th key={tier.planName} scope="col" className={`px-6 py-3 text-center text-xs font-medium uppercase tracking-wider ${tier.isPopular ? 'text-primary' : 'text-gray-500'}`}>
                      {tier.planName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {featureRows.map((feature) => (
                  <tr key={feature.key} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {feature.label}
                    </td>
                    {pricingTiers.map((tier) => (
                      <td key={`${tier.planName}-${feature.key}`} className={`px-6 py-4 whitespace-normal text-sm text-center ${tier.isPopular ? 'bg-primary/5' : ''}`}>
                        {feature.key === 'price' 
                          ? (
                            <div className="font-semibold">
                              {tier.price}
                              {tier.priceFrequency && <span className="block text-xs font-normal text-muted-foreground">{tier.priceFrequency}</span>}
                            </div>
                          )
                          : renderFeatureValue(tier.features[feature.key as keyof typeof tier.features])
                        }
                      </td>
                    ))}
                  </tr>
                ))}
                {/* CTA Row */}
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
                  {pricingTiers.map((tier) => (
                    <td key={`${tier.planName}-cta`} className={`px-6 py-4 text-center ${tier.isPopular ? 'bg-primary/10' : ''}`}>
                      <Button asChild variant={tier.isPopular ? 'default' : 'outline'} size="sm">
                        <Link href={tier.ctaLink}>{tier.ctaLabel}</Link>
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
