"use client";

import { useState } from "react";

const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    };

    return (
      <button
        onClick={handleCopy}
        className="ml-2 p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
        title="Copy to clipboard"
      >
        <Copy size={16} />
        {copied && (
          <span className="ml-1 text-xs text-green-500">Copied!</span>
        )}
      </button>
    );
  };

export default CopyButton;
