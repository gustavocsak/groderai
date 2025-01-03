import { reportData } from "@/store/state";
import { useAtom } from "jotai";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Code2, FileText, Info } from "lucide-react";

export default function AssignmentInfo() {
  const [data] = useAtom(reportData);
  const [isOpen, setIsOpen] = useState(false);

  if (data) {
    const metadata = data.metadata;

    const codeRequirements = metadata.requirements.filter(
      (req) =>
        req.toLowerCase().includes("error") ||
        req.toLowerCase().includes("method") ||
        req.toLowerCase().includes("program") ||
        req.toLowerCase().includes("run"),
    );

    const documentationRequirements = metadata.requirements.filter(
      (req) =>
        req.toLowerCase().includes("comment") ||
        req.toLowerCase().includes("javadoc") ||
        req.toLowerCase().includes("description") ||
        req.toLowerCase().includes("header"),
    );

    const fileRequirements = metadata.requirements.filter(
      (req) =>
        req.toLowerCase().includes("file") ||
        req.toLowerCase().includes("input") ||
        req.toLowerCase().includes("output") ||
        req.toLowerCase().includes("save"),
    );

    const otherRequirements = metadata.requirements.filter(
      (req) =>
        ![
          ...codeRequirements,
          ...documentationRequirements,
          ...fileRequirements,
        ].includes(req),
    );
    return (
      <div className="p-4 space-y-2">
        <div className="flex justify-between">
          <p className="text-xl">{metadata.title}</p>
          <Badge variant="outline">{metadata.language}</Badge>
        </div>
        <p>{metadata.summary}</p>

        <div className="space-y-4">
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4" />
                <h3 className="text-sm font-semibold">Code Requirements</h3>
              </div>
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 pt-2">
              <ul className="list-disc space-y-2 text-sm">
                {codeRequirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>

          {/* Documentation Requirements Section */}
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <h3 className="text-sm font-semibold">Documentation</h3>
              </div>
              <ChevronRight className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 pt-2">
              <ul className="list-disc space-y-2 text-sm">
                {documentationRequirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>

          {/* File Handling Requirements Section */}
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <h3 className="text-sm font-semibold">File Handling</h3>
              </div>
              <ChevronRight className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 pt-2">
              <ul className="list-disc space-y-2 text-sm">
                {fileRequirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>

          {/* Other Requirements Section */}
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <h3 className="text-sm font-semibold">Other Requirements</h3>
              </div>
              <ChevronRight className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 pt-2">
              <ul className="list-disc space-y-2 text-sm">
                {otherRequirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-1 p-4">
      The assignment instructions that you submit for analysis will appear here
    </div>
  );
}
