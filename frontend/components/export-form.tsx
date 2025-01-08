"use client";

import { useState } from "react";
import { FileText, Code, GitFork } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { reportData } from "@/store/state";
import { useAtom } from "jotai";
import { generateReport } from "@/lib/utils";

/**
 * TODO: SEE HANDLEFILESELECTION
 * TODO: MUST SELECT AT LEAST ONE FILE FOR REPORT
 * TODO: MAYBE ADD OPTION TO KEEP ASSIGNMENT SUMMARY
 */

const reportTypes = [
  { id: "summary", label: "Summary", icon: FileText },
  { id: "code-analysis", label: "Code Analysis", icon: Code },
  { id: "methods", label: "Methods", icon: GitFork },
];

import { testdata } from "@/lib/types";

export default function ExportForm() {
  const files = testdata.students;
  // const [data] = useAtom(reportData);
  const [selectedReportTypes, setSelectedReportTypes] = useState<string[]>([
    "summary",
  ]);
  const [fileExtension, setFileExtension] = useState("markdown");
  const [selectedFiles, setSelectedFiles] = useState(
    files.map((file) => file.filename),
  );

  const toggleReportType = (type: string) => {
    setSelectedReportTypes((prev) => {
      const newSelection = prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type];

      // Ensure at least one type is selected
      return newSelection.length === 0 ? [type] : newSelection;
    });
  };

  // change this later
  // using file id
  // maybe implement an id instead of using filename for now
  const handleFileSelection = (fileId: string) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Exporting report:", {
      selectedReportTypes,
      fileExtension,
      selectedFiles,
    });
    console.log(
      generateReport(files, {
        fileExtension,
        selectedFiles,
        selectedReportTypes,
      }),
    );
    // Here you would typically call an API or trigger the report generation
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full max-w-2xl mx-auto">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Report Types</Label>
            <div className="grid grid-cols-3 gap-4">
              {reportTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <div key={type.id}>
                    <input
                      type="checkbox"
                      id={type.id}
                      checked={selectedReportTypes.includes(type.id)}
                      onChange={() => toggleReportType(type.id)}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={type.id}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <Icon className="mb-3 h-6 w-6" />
                      {type.label}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file-extension">File Extension</Label>
            <Select value={fileExtension} onValueChange={setFileExtension}>
              <SelectTrigger id="file-extension">
                <SelectValue placeholder="Select file extension" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="markdown">Markdown</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Select Files to Include</Label>
            <Card>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                {files.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center space-x-2 py-2"
                  >
                    <Checkbox
                      id={`file-${file.filename}`}
                      checked={selectedFiles.includes(file.filename)}
                      onCheckedChange={() => handleFileSelection(file.filename)}
                    />
                    <Label htmlFor={`file-${file.filename}`}>
                      {file.filename}
                    </Label>
                  </div>
                ))}
              </ScrollArea>
            </Card>
          </div>
        </div>
        <div className="mt-2">
          <Button type="submit" className="w-full">
            Export Report
          </Button>
        </div>
      </div>
    </form>
  );
}
