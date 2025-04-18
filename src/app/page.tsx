// import { getAllNoteMetadata, searchNotesSemantic, NoteMetadata } from '@/lib/notes';
import LandingHeader from "@/components/landing-header";
import LandingFooter from "@/components/landing-footer";
import Image from 'next/image';
// import SearchBar from '@/components/SearchBar';
// import NoteTableRow from '@/components/NoteTableRow';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PricingCard from "@/components/pricing-card";
// Removed unused Lucide icons: Bot, CodeXml, Cpu 
import { ArrowRight, Clock, Combine, Share2, MessagesSquare, TerminalSquare, Network, Puzzle, Quote, Rocket } from "lucide-react";
import HeroActions from "@/components/hero-actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  // const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.skolp.com"; // No longer needed directly here

  // Pricing Data for Landing Page - Simplified & Synced with pricing page data
  const pricingTiers = [
    {
      planName: "Free",
      price: "$0", // Simplified from '$0 forever'
      description: "Try the core features.", // Simplified description
      features: [
        "2 Public Repo Scans/Month",
        "Up to 50 Endpoints/Bridge",
        "3 Bridge Generations/Month",
        "Community Support"
      ],
      ctaLabel: "Get Started", // Matches pricing page CTA
      ctaLink: loginUrl // Matches pricing page CTA
    },
    {
      planName: "Hobby",
      price: "$9", // Simplified from '$9 / month'
      description: "For individuals & hobbyists.",
      features: [
        "10 Repo Scans/Month",
        "Private Repository Scanning",
        "Up to 500 Endpoints/Bridge",
        "10 Bridge Generations/Month",
        "Basic Email Support"
      ],
      ctaLabel: "Choose Hobby", // Matches pricing page CTA
      ctaLink: loginUrl // Matches pricing page CTA
    },
    {
      planName: "Professional",
      price: "$27", // Simplified from '$27 / month'
      description: "For developers & small teams.",
      features: [
        "50 Repo Scans/Month",
        "Up to 2000 Endpoints/Bridge",
        "50 Bridge Generations/Month",
        "View Generated Files",
        "Priority Generation Queue",
        "Priority Email Support"
      ],
      ctaLabel: "Choose Pro", // Matches pricing page CTA
      ctaLink: loginUrl, // Matches pricing page CTA
      isPopular: true // Matches pricing page popular plan
    },
    {
      planName: "Enterprise",
      price: "Custom", // Matches pricing page
      description: "For large organizations.",
      features: [
        "Custom Usage Limits",
        "Everything in Pro +",
        "Team Management & Roles",
        "Dedicated Support & SLA",
        "On-Premise Option"
      ],
      ctaLabel: "Contact Sales", // Matches pricing page CTA
      ctaLink: "/contact" // Matches pricing page CTA for enterprise
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

  // Define Tech Details Data
  const techDetailsData = [
    {
      icon: TerminalSquare,
      title: "Stdio Communication",
      description: "Efficient, language-agnostic input/output stream handling for the bridge."
    },
    {
      icon: Network,
      title: "HTTPX Requests",
      description: "Modern, async-ready HTTP client for reliable communication with your API."
    },
    {
      icon: Puzzle, // Represents the protocol piece
      title: "MCP Protocol",
      description: "Adheres to the open Multi-Capability Protocol for broad agent compatibility."
    }
  ];

  // RE-DEFINE Benefits Data with user updates
  const benefitsData = [
    {
      icon: Clock,
      title: "Set up in minutes, not weeks.",
      description: "Rapidly bridge your API with minimal configuration."
    },
    {
      icon: Combine, // Represents multiple backends combining
      title: "Works with Python, Node.js, or any backend.",
      description: "Optimized for Python/FastAPI now, with planned support for Node.js and others."
    },
    {
      icon: Share2, // Represents open standards/connectivity
      title: "Leverages stdio and MCP for open integration.",
      description: "Uses lightweight, standard protocols – no vendor lock-in."
    },
    {
      icon: MessagesSquare, // Represents chat/LLM interaction
      title: "Enable users to chat with your service via any LLM.",
      description: "Connect to Claude, ChatGPT, Cursor, or other MCP-compatible agents."
    }
  ];

  // Define FAQ Data (kept for when Accordion is added)
  const faqData = [
    {
      question: "Does Skolp modify my existing API code?",
      answer: "No. Skolp scans your code but generates a *separate*, standalone bridge package. Your original API remains untouched."
    },
    {
      question: "What backends are supported for scanning?",
      answer: "Currently, Skolp is optimized for scanning Python FastAPI repositories. Support for Node.js (Express, etc.) and other backends is planned."
    },
    {
      question: "Is the generated bridge secure?",
      answer: "You have full control. Skolp lets you select exactly which API endpoints are exposed as tools in the generated bridge, keeping sensitive endpoints private."
    },
    {
      question: "How does Skolp handle API authentication?",
      answer: "Authentication details (like API keys or tokens) are configured securely within the generated bridge package, typically via environment variables, not exposed through Skolp itself."
    },
    {
      question: "Does it scale for multi-tenant SaaS?",
      answer: "Yes, the generated bridge communicates with your running API instance via standard HTTP. How your API handles multi-tenancy is independent of the Skolp bridge, ensuring it works seamlessly with your existing architecture."
    }
  ];

   // Updated integrations array to use image paths
   const integrations = [
    { name: "Claude", imgSrc: "/claude-logo.png" },
    { name: "Cursor", imgSrc: "/cursor-logo.png" },
    { name: "Windsurf", imgSrc: "/windsurf-logo.png" },
    // Add more logos/placeholders as needed
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10 bg-white">
          <div className="text-center lg:text-start space-y-6">
            <main className="text-5xl md:text-6xl font-bold">
              <h1 className="leading-tight">
              <span className="text-primary"> Three Clicks </span> to Chat-Ready SaaS with MCP
              </h1>
            </main>
            <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
              Turn your backend into an LLM-ready MCP server in minutes. No DevOps, no lock-in.
            </p>
            <HeroActions loginUrl={loginUrl} />
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
        
        {/* Tech Details Section */}
        <section id="tech-details" className="container py-16 sm:py-20 bg-muted/40">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-3">
              Built on Open, Reliable Standards
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              No proprietary protocols, just efficient communication.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {techDetailsData.map((tech, index) => (
              <div key={index} className="flex flex-col items-center text-center space-y-2">
                <tech.icon className="w-10 h-10 text-primary mb-2" strokeWidth={1.5} />
                <h3 className="text-lg font-medium text-foreground">{tech.title}</h3>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RE-INSERT Benefits Section */}
        <section id="benefits" className="container py-24 sm:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why <span className="text-primary">Skolp?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Focus on your API logic, let Skolp handle the AI integration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {benefitsData.map((benefit, index) => (
              <div key={index} className="flex flex-col items-start p-6 bg-card border rounded-lg shadow-sm space-y-3">
                <benefit.icon className="w-10 h-10 text-primary mb-3" strokeWidth={1.5} />
                <h3 className="text-xl font-semibold text-card-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* INSERT Social Proof Section */}
        <section id="social-proof" className="container py-16 sm:py-20">
           <div className="max-w-3xl mx-auto">
             <div className="bg-card border rounded-xl p-8 shadow-lg relative overflow-hidden">
                <Quote className="absolute -top-4 -left-4 w-20 h-20 text-primary/10" strokeWidth={1} />
                <blockquote className="text-xl italic text-foreground z-10 relative">
                  "I went from backend to chat-ready in 5 minutes. This is a game-changer for exposing internal tools to LLMs without rewriting everything."
                </blockquote>
                <p className="text-right mt-4 text-muted-foreground z-10 relative">
                  — A. Developer, SaaS Founder
                </p>
             </div>
           </div>
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

        {/* RE-ADD FAQ Section */}
        <section id="faq" className="container py-24 sm:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Have questions? We\'ve got answers.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {faqData.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left hover:text-primary">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
        
        {/* Integrations Section - Updated - Add bg-white */}
        <section id="integrations" className="container py-24 sm:py-32 text-center bg-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Connect Skolp to your <span className="text-primary">favorite Tools</span> {/* Updated heading slightly */}
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Seamlessly integrate with the most important tools your team uses.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8"> {/* Increased gap-x */}
            {integrations.map((integration) => (
              <div key={integration.name} className="flex flex-col items-center space-y-3"> {/* Ensure this closing div exists */}
                <Image 
                  src={integration.imgSrc}
                  alt={`${integration.name} logo`}
                  width={120}
                  height={48}
                  className="object-contain"
                />
              </div>
            ))}
          </div> {/* Ensure outer div closes */}
        </section>

        {/* INSERT Final CTA Section */}
        <section id="final-cta" className="py-24 sm:py-32 bg-primary/90 text-primary-foreground">
          <div className="container text-center max-w-3xl mx-auto">
            <Rocket className="w-16 h-16 mx-auto mb-6 opacity-80" strokeWidth={1} />
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Ready to Connect Your API?
            </h2>
            <p className="text-xl opacity-90 mb-10">
              Stop rebuilding, start bridging. Generate your first MCP tool server in minutes.
            </p>
            <Button size="lg" variant="secondary" asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link href={loginUrl}>
                Start Free Now (No Credit Card Required)
              </Link>
            </Button>
          </div>
        </section>

      </main>
      <LandingFooter />
    </div>
  );
}
