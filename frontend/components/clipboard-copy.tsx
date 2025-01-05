import { Check, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface ClipboardCopyProps {
  content: string;
}

export default function ClipboardCopy({ content }: ClipboardCopyProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={copyToClipboard}
      className="h-8 w-20 absolute top-4 right-6"
    >
      {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      Copy
      <span className="sr-only">Copy code</span>
    </Button>
  );
}
