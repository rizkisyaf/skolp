import Link from 'next/link';
import Image from 'next/image';

export default function SiteHeader() {
  return (
    <header className="w-full max-w-4xl mb-10">
      <Link href="/" aria-label="Back to homepage">
        <Image 
          src="/logo.svg"
          alt="Skolp Logo"
          width={120} // Smaller size for header
          height={0} // Auto height
          style={{ height: 'auto' }}
          priority // Load logo quickly on note pages too
        />
      </Link>
    </header>
  );
} 