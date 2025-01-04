import { Card } from "./ui/card";
import { Check, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface CodeViewerProps {
  content: string;
}

export default function CodeViewer({ content }: CodeViewerProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Card className="relative border font-mono text-sm overflow-hidden shadow-none">
      <Button
        variant="ghost"
        size="icon"
        onClick={copyToClipboard}
        className="h-8 w-20 absolute top-4 right-8"
      >
        {isCopied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        Copy
        <span className="sr-only">Copy code</span>
      </Button>
      <div className="overflow-auto max-h-[450px] p-4">
        <pre className="language-typescript">
          <code>{content}</code>
        </pre>
      </div>
    </Card>
  );
}
