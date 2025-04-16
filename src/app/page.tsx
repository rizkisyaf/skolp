// import { getAllNoteMetadata, searchNotesSemantic, NoteMetadata } from '@/lib/notes';
import LandingHeader from "@/components/landing-header";
import LandingFooter from "@/components/landing-footer";
import Image from 'next/image';
// import SearchBar from '@/components/SearchBar';
// import NoteTableRow from '@/components/NoteTableRow';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PricingCard from "@/components/pricing-card";
import { ArrowRight, Bot, CodeXml, Cpu } from "lucide-react"; // Import icons for logos

// type HomePageProps = {
//   searchParams: Promise<{ 
//     query?: string; 
//   }>;
// };

// export default async function Home({ searchParams }: HomePageProps) {
export default function Home() {
  // const awaitedSearchParams = await searchParams;
  // const query = awaitedSearchParams?.query || '';
  // let notesToDisplay: NoteMetadata[];
  // if (query) {
  //   notesToDisplay = await searchNotesSemantic(query);
  // } else {
  //   notesToDisplay = getAllNoteMetadata();
  // }

  // Use environment variables with fallbacks for production
  const loginUrl = process.env.NEXT_PUBLIC_APP_LOGIN_URL || "https://app.skolp.com/api/auth/login/github";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.skolp.com";

  // Pricing Data based on skolp_is.txt
  const pricingTiers = [
    {
      planName: "Free",
      price: "$0",
      description: "Try the core features.",
      features: [
        "1-2 Public Repo Scans/Month",
        "Up to 10 Endpoints/Bridge",
        "1-3 Bridge Generations/Month",
        "Community Support"
      ],
      ctaLabel: "Get Started",
      ctaLink: loginUrl // Link Free tier to login
    },
    {
      planName: "Hobby",
      price: "$9",
      description: "For individuals & hobbyists.",
      features: [
        "5-10 Public Repo Scans/Month",
        "Up to 30 Endpoints/Bridge",
        "10 Bridge Generations/Month",
        "Private Repository Scanning",
        "Target URL Configuration",
        "Generation History (Last 5)",
        "Basic Email Support"
      ],
      ctaLabel: "Choose Hobby",
      ctaLink: loginUrl // Changed to login URL
    },
    {
      planName: "Professional",
      price: "$27",
      description: "For developers & small teams.",
      features: [
        "25-50 Repo Scans/Month",
        "Up to 100 Endpoints/Bridge",
        "50 Bridge Generations/Month",
        "Everything in Hobby +",
        "Customizable Tool Names",
        "Priority Generation",
        "Extended History (Last 30)",
        "Priority Email Support"
      ],
      ctaLabel: "Choose Pro",
      ctaLink: loginUrl, // Changed to login URL
      isPopular: true 
    },
    {
      planName: "Enterprise",
      price: "Custom",
      description: "For large organizations.",
      features: [
        "Unlimited Usage (Custom)",
        "Everything in Pro +",
        "Custom Base Templates",
        "Team Management & Roles",
        "Dedicated Support & SLA",
        "On-Premise Option",
        "Custom Integrations"
      ],
      ctaLabel: "Contact Sales",
      ctaLink: loginUrl // Changed to login URL (User logs in, then contacts)
    }
  ];

  const featuresData = [
    {
      title: "Unlock Existing APIs for AI",
      description: "Connect any API (local, staging, production) to LLMs and agents instantly. No code rewrites needed.",
      visual: "Visual Placeholder 1"
    },
    {
      title: "Generate Bridges in Seconds",
      description: "Scan your repository, select endpoints, and Skolp automatically generates the necessary stdio bridge package and MCP config.",
      visual: "Visual Placeholder 2"
    },
    {
      title: "Secure & Selective Exposure",
      description: "Choose exactly which API endpoints to expose as tools, keeping sensitive functions private and simplifying agent interactions.",
      visual: "Visual Placeholder 3"
    }
  ];

   const integrations = [
    { name: "Claude", icon: Bot },
    { name: "Cursor", icon: CodeXml },
    { name: "Other MCP Clients", icon: Cpu },
    // Add more logos/placeholders as needed
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
          <div className="text-center lg:text-start space-y-6">
            <main className="text-5xl md:text-6xl font-bold">
              <h1 className="leading-tight">
                Instantly Create
                <span className="text-primary"> MCP Tools </span>
                from Any API
              </h1>
            </main>
            <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
              Skolp scans your API code, lets you select endpoints, and generates ready-to-use bridge packages for LLMs and agents.
            </p>
            <div className="space-y-4 md:space-y-0 md:space-x-4">
              <Button className="w-full md:w-1/3" asChild>
                 <Link href={loginUrl}>
                   <span>Get Started</span>
                 </Link>
              </Button>
              <Button variant="outline" className="w-full md:w-1/3" asChild>
                <Link href={appUrl}>
                  <span>Launch App</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Hero Image (Mascot) */}
          <div className="z-10">
            <Image
              src="/mascott.png" // Use mascot from brand guide
              width={500}
              height={500}
              alt="Skolp Mascot holding hammer"
              className="mx-auto" // Center image
            />
          </div>
        </section>

        {/* Features Section - Refactored */}
        <section id="features" className="container py-24 sm:py-32 space-y-16 bg-background-subtle">
          <h2 className="text-3xl lg:text-4xl font-bold text-center">
            How Skolp <span className="text-primary">Empowers</span> You
          </h2>

          {featuresData.map((feature, index) => (
            <div key={index} className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Alternate layout based on index */}
              <div className={`lg:order-${index % 2 === 0 ? 1 : 2}`}> 
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-lg text-muted-foreground mb-4">
                  {feature.description}
                </p>
              </div>
              <div className={`aspect-video bg-muted rounded-lg flex items-center justify-center text-muted-foreground lg:order-${index % 2 === 0 ? 2 : 1}`}> 
                {feature.visual} {/* Replace with actual visual/GIF later */}
              </div>
            </div>
          ))}
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className="container py-24 sm:py-32">
          <h2 className="text-3xl lg:text-4xl font-bold md:text-center mb-4">
            Choose Your <span className="text-primary">Plan</span>
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-10">
            Simple pricing for every stage.
          </p>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {pricingTiers.map((tier) => (
              <PricingCard key={tier.planName} {...tier} />
            ))}
          </div>
        </section>

        {/* Integrations Section - New */}
        <section id="integrations" className="container py-24 sm:py-32 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Connect Skolp to your <span className="text-primary">favorite LLMs</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Seamlessly integrate with the most important tools your team uses.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {integrations.map((integration) => (
              <div key={integration.name} className="flex flex-col items-center space-y-2">
                <integration.icon className="w-12 h-12 text-muted-foreground" /> 
                <span className="text-sm font-medium text-muted-foreground">{integration.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* TODO: Add other sections (Testimonials, Pricing Preview, etc.) */}

      </main>
      <LandingFooter />
    </div>
  );
}
