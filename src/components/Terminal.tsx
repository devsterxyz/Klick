import React, { useState } from "react";

const tokenPattern =
  /(\{\/\*[\s\S]*?\*\/\}|<\/?[A-Z][A-Za-z0-9.]*|<\/?|\/?>|[A-Za-z_$][\w$-]*(?==)|"[^"]*"|'[^']*'|\b\d+(?:\.\d+)?\b|[{}=])/g;

const getTokenClassName = (token: string) => {
  if (/^\{\/\*/.test(token)) return "text-emerald-700 dark:text-emerald-400";
  if (/^<\/?[A-Z]/.test(token)) return "text-teal-700 dark:text-teal-300";
  if (/^["']/.test(token)) return "text-orange-700 dark:text-orange-300";
  if (/^\d/.test(token)) return "text-violet-700 dark:text-violet-300";
  if (/^[A-Za-z_$][\w$-]*$/.test(token)) return "text-sky-700 dark:text-sky-300";
  if (/^[{}]$/.test(token)) return "text-amber-700 dark:text-amber-300";
  if (/^(<\/?|\/?>|=)$/.test(token)) return "text-neutral-600 dark:text-neutral-400";
  return "text-neutral-900 dark:text-neutral-100";
};

const renderHighlightedCode = (code: string) =>
  code.split(tokenPattern).map((token, index) => (
    <span key={`${token}-${index}`} className={getTokenClassName(token)}>
      {token}
    </span>
  ));

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
    <div className="w-full max-w-[42rem] rounded-md border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-[#0b0b0b] overflow-hidden transition-all duration-200">
      
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-black/5 dark:border-white/5">
        <span className="text-[10px] font-mono text-black/40 dark:text-white/40 uppercase tracking-widest">
          {fileName || "App.tsx"}
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
          <code>{renderHighlightedCode(code)}</code>
        </pre>
      </div>
    </div>
  );
};

export default Terminal;
