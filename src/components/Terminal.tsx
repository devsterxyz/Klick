import React, { useState } from "react";

/**
 * Terminal / SnippetBox Component
 * A clean box for multi-line code snippets with a copy button.
 */
const Terminal = ({ code, fileName }: { code: string; fileName?: string }): React.ReactNode => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textArea = document.createElement("textarea");
    textArea.value = code;
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Unable to copy", err);
    }

    document.body.removeChild(textArea);
  };

  return (
    <div className="w-full max-w-[31rem] rounded-md border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-[#0b0b0b] overflow-hidden transition-all duration-200">
      
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-black/5 dark:border-white/5">
        <span className="text-[10px] font-mono text-black/40 dark:text-white/40 uppercase tracking-widest">
          {fileName || "Usage"}
        </span>

        <button
          type="button"
          onClick={handleCopy}
          className={`text-xs transition-colors duration-200 font-medium
            ${
              copied
                ? "text-emerald-500 font-bold"
                : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
            }`}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* Code */}
      <div className="p-4 font-mono text-sm text-black/80 dark:text-white/80 overflow-x-auto">
        <pre className="whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default Terminal;