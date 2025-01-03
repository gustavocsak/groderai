import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Student } from "./types";

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
