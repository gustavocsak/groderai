import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Student } from "./types";
import { createHighlighter } from "shiki";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function studentToMarkdown(student: Student) {
  let md = "";

  const totalMethods = student.methods.length;
  const correctMethods = student.methods.filter((m) => m.is_correct).length;
  const documentedMethods = student.methods.filter(
    (m) => m.is_documented,
  ).length;

  md += `# ${student.name}\n\n`;
  md += `### ${student.filename}\n\n`;

  md += `### Methods\n\n`;
  md += `${correctMethods} / ${totalMethods} correct\n`;
  md += `${documentedMethods} / ${totalMethods} documented\n\n`;

  md += `### Notes\n\n`;

  for (const entry of student.summary) {
    md += `- ${entry}\n`;
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
