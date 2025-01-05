import ClipboardCopy from "./clipboard-copy";
import { Card } from "./ui/card";
import { useEffect, useState } from "react";
import { codeToHtml } from "@/lib/utils";

interface CodeViewerProps {
  content: string;
  language: string;
}

export default function CodeViewer({ content, language }: CodeViewerProps) {
  const [highlightedCode, setHighlightedCode] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    const highlightCode = async () => {
      const html = await codeToHtml(content, language);
      if (isMounted) {
        setHighlightedCode(html);
      }
    };

    highlightCode();

    return () => {
      isMounted = false;
    };
  }, [content, language]);

  return (
    <Card className="relative border font-mono text-sm overflow-hidden shadow-none">
      <ClipboardCopy content={content} />
      <div
        className="overflow-auto max-h-[500px] p-4"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      >
        {/* <pre className={`whitespace-pre-wrap`}>
          <code>{highlightedCode}</code>
        </pre> */}
      </div>
    </Card>
  );
}
