'use client';

import React, { useState, useRef, ReactNode, HTMLProps } from 'react';
import { Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

// Helper function to extract text content from React nodes
function getNodeText(node: ReactNode): string {
  if (typeof node === 'string') {
    return node;
  }
  if (Array.isArray(node)) {
    return node.map(getNodeText).join('');
  }
  // Check if it's a valid element and assume props structure for children extraction
  if (React.isValidElement(node) && node.props && typeof node.props === 'object') {
    // Use type assertion here after checking props existence
    const props = node.props as { children?: ReactNode }; 
    if (props.children) {
      return getNodeText(props.children);
    }
  }
  return '';
}

// Define props based on standard HTML <pre> attributes + children
interface CodeBlockWrapperProps extends HTMLProps<HTMLPreElement> {
  children?: ReactNode;
}

export default function CodeBlockWrapper({ children, className: incomingClassName, ...restProps }: CodeBlockWrapperProps) {
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    // Extract text content from the children passed to the pre tag
    const textToCopy = getNodeText(children);

    if (!textToCopy) {
        toast.error('Nothing to copy');
        return;
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      toast.success('Copied to clipboard!', {
          duration: 2000,
          position: 'bottom-center',
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '8px',
          },
        });
      setTimeout(() => setIsCopied(false), 2000); // Reset icon after 2s
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
      console.error('Failed to copy text: ', err);
    }
  };

  const requiredClasses = "bg-gray-900 p-4 rounded-md overflow-x-auto whitespace-pre-wrap break-words";

  return (
    <div className="relative group">
      <pre 
        ref={preRef} 
        className={`${requiredClasses} ${incomingClassName || ''}`.trim()} 
        {...restProps} // restProps are now correctly typed based on HTMLProps<HTMLPreElement>
      >
        {children}
      </pre>
      {/* Copy Button - Adjusted visibility */}
      <button
        onClick={handleCopy}
        aria-label={isCopied ? 'Copied' : 'Copy code'}
        // Always visible on small screens, hover effect on medium+ screens
        className="absolute top-2 right-2 p-1.5 bg-gray-700 rounded-md text-gray-300 hover:bg-gray-600 hover:text-gray-100 transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100" 
      >
        {isCopied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
} 