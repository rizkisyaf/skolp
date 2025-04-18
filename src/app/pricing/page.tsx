"use client"; // Assuming PricingCard might need client-side interaction

import LandingHeader from "@/components/landing-header";
import LandingFooter from "@/components/landing-footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, X } from "lucide-react"; // Import icons

// New pricing data structure
const pricingData = {
  "plans": ["free", "hobby", "professional", "enterprise"],
  "features": [
    {
      "feature": "Price",
      "description": "Monthly cost per user.",
      "values": {
        "free": "$0 forever",
        "hobby": "$9 / month",
        "professional": "$27 / month",
        "enterprise": "Custom"
      }
    },
    {
      "feature": "Repositories Scanned",
      "description": "Maximum number of unique GitHub repositories scanned per month.",
      "values": {
        "free": "2 public / month",
        "hobby": "10 public & private / month",
        "professional": "50 public & private / month",
        "enterprise": "Custom / Unlimited"
      }
    },
    {
      "feature": "Max Endpoints per Bridge",
      "description": "Maximum number of endpoints allowed in a single generated bridge package.",
      "values": {
        "free": "50",
        "hobby": "500",
        "professional": "2000",
        "enterprise": "Custom / Unlimited"
      }
    },
    {
      "feature": "Bridge Generations",
      "description": "Maximum number of bridge packages generated per month.",
      "values": {
        "free": "3 / month",
        "hobby": "10 / month",
        "professional": "50 / month",
        "enterprise": "Custom / Unlimited"
      }
    },
     {
      "feature": "GitHub Account Connection",
      "description": "Ability to connect your GitHub account via OAuth.",
      "values": {
        "free": "✓",
        "hobby": "✓",
        "professional": "✓",
        "enterprise": "✓"
      }
    },
    {
      "feature": "Private Repository Support",
      "description": "Ability to scan private repositories (requires GitHub connection).",
      "values": {
        "free": "✕",
        "hobby": "✓",
        "professional": "✓",
        "enterprise": "✓"
      }
    },
    {
      "feature": "Target API URL Configuration",
      "description": "How the target API base URL is configured for generated bridges.",
       "values": {
        "free": "Manual code edit",
        "hobby": "In Skolp UI",
        "professional": "In Skolp UI",
        "enterprise": "In Skolp UI"
      }
    },
    {
      "feature": "Generation History Access",
      "description": "View past generated packages.",
      "values": {
        "free": "✓ (List view)",
        "hobby": "✓ (List view)",
        "professional": "✓ (List view + File Viewing)",
        "enterprise": "✓ (Extended / Custom)"
      }
    },
     {
      "feature": "View Generated Files",
      "description": "Ability to browse the contents of generated packages within the app.",
      "values": {
        "free": "✕",
        "hobby": "✕",
        "professional": "✓",
        "enterprise": "✓"
      }
    },
    {
      "feature": "Customizable Tool Names",
      "description": "Customize the names of generated MCP tools.",
      "values": {
        "free": "✕",
        "hobby": "✕",
        "professional": "✓",
        "enterprise": "✓"
      }
    },
    {
      "feature": "Priority Generation Queue",
      "description": "Generated packages are built faster.",
      "values": {
        "free": "✕",
        "hobby": "✕",
        "professional": "✓",
        "enterprise": "✓"
      }
    },
    {
      "feature": "Support Level",
      "description": "Level of customer support provided.",
       "values": {
        "free": "Community",
        "hobby": "Basic Email",
        "professional": "Priority Email",
        "enterprise": "Dedicated + Account Manager"
      }
    },
    {
      "feature": "Custom Base Templates",
      "description": "Use custom templates for generating bridge code.",
       "values": {
        "free": "✕",
        "hobby": "✕",
        "professional": "✕",
        "enterprise": "✓"
      }
    },
    {
      "feature": "Team Management & Roles",
      "description": "Invite and manage team members with different permissions.",
       "values": {
        "free": "✕",
        "hobby": "✕",
        "professional": "✕",
        "enterprise": "✓"
      }
    },
    {
      "feature": "Service Level Agreement (SLA)",
      "description": "Guaranteed uptime and support response times.",
      "values": {
        "free": "✕",
        "hobby": "✕",
        "professional": "✕",
        "enterprise": "✓"
      }
    },
    {
      "feature": "On-Premise Deployment Option",
      "description": "Deploy Skolp within your own infrastructure.",
       "values": {
        "free": "✕",
        "hobby": "✕",
        "professional": "✕",
        "enterprise": "✓"
      }
    },
    {
      "feature": "Custom Integrations",
      "description": "Custom integrations with other services or tools.",
       "values": {
        "free": "✕",
        "hobby": "✕",
        "professional": "✕",
        "enterprise": "✓"
      }
    }
  ]
};

// Helper to render feature value (Check/X icons or text)
const renderFeatureValue = (value: string | undefined) => {
  if (value === '✓') {
    return <Check className="w-5 h-5 text-green-600 mx-auto" />;
  }
  if (value === '✕') {
    return <X className="w-5 h-5 text-red-500 mx-auto" />;
  }
  // Handle multi-line values like price
  if (typeof value === 'string' && value.includes(' / ')) {
    const parts = value.split(' / ');
    return (
      <div className="font-semibold">
        {parts[0]}
        <span className="block text-xs font-normal text-muted-foreground">/ {parts[1]}</span>
      </div>
    );
  } 
   // Handle the special case for "$0 forever"
  if (value === "$0 forever") {
    return (
      <div className="font-semibold">
        $0
        <span className="block text-xs font-normal text-muted-foreground">forever</span>
      </div>
    );
  }
  
  return value || '-'; // Display text or '-' if undefined/empty
};

// Define CTA details based on plan name (assuming professional is popular)
const popularPlan = "professional";
const loginUrl = process.env.NEXT_PUBLIC_APP_LOGIN_URL || "https://app.skolp.com/api/auth/callback/github";

const getCtaDetails = (planName: string) => {
  switch (planName) {
    case 'free':
      return { label: 'Get Started', link: loginUrl };
    case 'hobby':
      return { label: 'Choose Hobby', link: loginUrl };
    case 'professional':
      return { label: 'Choose Pro', link: loginUrl };
    case 'enterprise':
      return { label: 'Contact Sales', link: '/contact' };
    default:
      return { label: 'Learn More', link: '/' };
  }
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

          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6 w-1/4">
                    Feature
                  </th>
                  {pricingData.plans.map((plan) => (
                    <th key={plan} scope="col" className={`py-3 px-6 text-center capitalize ${plan === popularPlan ? 'text-primary' : ''}`}>
                      {plan}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pricingData.features.map((featureItem, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {featureItem.feature}
                      {featureItem.description && <p className="text-xs font-normal text-gray-500 dark:text-gray-400 mt-1">{featureItem.description}</p>}
                    </th>
                    {pricingData.plans.map((plan) => (
                      <td key={`${plan}-${index}`} className={`py-4 px-6 text-center ${plan === popularPlan ? 'bg-primary/5' : ''}`}>
                        {renderFeatureValue(featureItem.values[plan as keyof typeof featureItem.values])}
                      </td>
                    ))}
                  </tr>
                ))}
                {/* CTA Row */}
                <tr className="bg-white dark:bg-gray-800">
                  <td className="py-4 px-6"></td>
                  {pricingData.plans.map((plan) => {
                    const cta = getCtaDetails(plan);
                    const isPopular = plan === popularPlan;
                    return (
                      <td key={`${plan}-cta`} className={`py-4 px-6 text-center ${isPopular ? 'bg-primary/10' : ''}`}>
                        <Button asChild variant={isPopular ? 'default' : 'outline'} size="sm">
                          <Link href={cta.link}>{cta.label}</Link>
                        </Button>
                      </td>
                    );
                  })}
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
