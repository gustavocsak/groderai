import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Student } from "./types";
import { createHighlighter } from "shiki";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function breakLongLine(line: string) {
  const maxLength = 150;

  for (let i = 0; i < line.length; i += maxLength) {
    line =
      line.substring(i, i + maxLength) + "\n" + line.substring(i + maxLength);
  }
  return line + "\n";
}

export async function codeToHtml(code: string, language: string) {
  const highlighter = await createHighlighter({
    themes: ["github-light", "github-dark"],
    langs: ["java", "c++", "markdown"],
  });

  return highlighter.codeToHtml(code, {
    lang: language,
    themes: {
      dark: "github-dark",
      light: "github-light",
    },
  });
}

export function summaryToMarkdown(student: Student) {
  let md = "";

  const totalMethods = student.methods.length;
  const correctMethods = student.methods.filter((m) => m.is_correct).length;
  const documentedMethods = student.methods.filter(
    (m) => m.is_documented,
  ).length;
  md += `## Summary\n\n`;
  md += `### Methods\n\n`;
  md += `${correctMethods} / ${totalMethods} correct\n`;
  md += `${documentedMethods} / ${totalMethods} documented\n\n`;

  md += `### Notes\n\n`;

  for (const entry of student.summary) {
    md += `- ${entry}\n`;
  }

  return md;
}

export function codeToMarkdown(student: Student) {
  const {
    documentation,
    readability,
    linting_errors,
    missing_requirements,
    restricted_usage,
  } = student.code_analysis;

  const sections = {
    Documentation: documentation,
    Readability: readability,
    "Linting Errors": linting_errors,
    "Missing Requirements": missing_requirements,
    "Restricted Usage": restricted_usage,
  };

  let md = `## Code Analysis\n\n`;

  Object.entries(sections).forEach(([sectionTitle, entries]) => {
    md += `### ${sectionTitle}\n\n`;
    if (entries.length === 0) {
      md += `- No issues found.\n`;
    } else {
      entries.forEach((entry) => {
        md += `- ${entry}\n`;
      });
    }
    md += `\n`;
  });

  return md;
}

export function methodsToMarkdown(student: Student): string {
  let md = "";
  const methods = student.methods;

  md += `## Methods\n\n`;

  for (const method of methods) {
    md += `### ${method.prototype}\n\n`;

    md += `- **Expected Prototype**: ${method.expected_prototype}\n`;
    md += `- **Is Correct**: ${method.is_correct ? "✅" : "❌"}\n`;
    md += `- **Is Documented**: ${method.is_documented ? "✅" : "❌"}\n`;
    md += `- **Time Complexity**: ${method.time_complexity}\n`;

    if (method.errors.length > 0) {
      md += `- **Errors**:\n`;
      method.errors.forEach((error) => {
        md += `  - ${error}\n`;
      });
    } else {
      md += `- **Errors**: None\n`;
    }

    md += `\n`; // Add spacing between methods
  }

  return md;
}

export function studentToText(student: Student) {
  let text = "";

  const totalMethods = student.methods.length;
  const correctMethods = student.methods.filter((m) => m.is_correct).length;
  const documentedMethods = student.methods.filter(
    (m) => m.is_documented,
  ).length;

  text += `${student.name}\n\n`;
  text += `${student.filename}\n\n`;

  text += `Methods:\n\n`;
  text += `${correctMethods} / ${totalMethods} correct\n`;
  text += `${documentedMethods} / ${totalMethods} documented\n\n`;

  text += `Notes\n\n`;

  for (const entry of student.summary) {
    text += `- ${entry}\n`;
  }

  return text;
}

interface ReportOptions {
  fileExtension: string;
  selectedFiles: string[];
  selectedReportTypes: string[];
}

export function generateReport(files: Student[], options: ReportOptions) {
  let content = "";
  const { selectedReportTypes, selectedFiles } = options;
  const includeSummary = selectedReportTypes.includes("summary");
  const includeCode = selectedReportTypes.includes("code-analysis");
  const includeMethods = selectedReportTypes.includes("methods");

  for (let i = 0; i < files.length; i++) {
    if (selectedFiles.includes(files[i].filename)) {
      content += `# ${files[i].name}\n\n`;
      content += `### ${files[i].filename}\n\n`;
      if (includeSummary) {
        content += summaryToMarkdown(files[i]);
        content += "\n\n";
      }
      if (includeCode) {
        content += codeToMarkdown(files[i]);
        content += "\n\n";
      }
      if (includeMethods) {
        content += methodsToMarkdown(files[i]);
        content += "\n\n";
      }
    }
  }

  const blob = new Blob([content], { type: "text/markdown" });

  // Create a temporary anchor element to trigger the download
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sample.md"; // File name
  document.body.appendChild(a);
  a.click();

  // Clean up
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  return content;
}
