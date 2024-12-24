"use client";

import {
  AlertTriangle,
  Bug,
  CheckCircle2,
  FileText,
  Info,
  MinusCircle,
  ShieldAlert,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeAnalysis } from "@/lib/types";

interface AnalysisCardProps {
  analysis: CodeAnalysis;
}

const sections = [
  {
    value: "documentation",
    icon: FileText,
    color: "text-purple-500",
    title: "Documentation Analysis",
    badgeLabel: "issues",
    dataKey: "documentation",
    iconForItem: Info,
  },
  {
    value: "linting",
    icon: Bug,
    color: "text-pink-500",
    title: "Linting Errors",
    badgeLabel: "issues",
    dataKey: "linting_errors",
    iconForItem: AlertTriangle,
  },
  {
    value: "missing",
    icon: MinusCircle,
    color: "text-red-500",
    title: "Missing Requirements",
    badgeLabel: "issues",
    dataKey: "missing_requirements",
    iconForItem: AlertTriangle,
  },
  {
    value: "readability",
    icon: CheckCircle2,
    color: "text-blue-500",
    title: "Readability Review",
    badgeLabel: "suggestions",
    dataKey: "readability",
    iconForItem: Info,
  },
  {
    value: "restricted",
    icon: ShieldAlert,
    color: "text-orange-500",
    title: "Restricted Usage",
    badgeLabel: "violations",
    dataKey: "restricted_usage",
    iconForItem: AlertTriangle,
  },
];

export default function AnalysisCardTest({ analysis }: AnalysisCardProps) {
  return (
    <Card className="h-full overflow-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Code Analysis</CardTitle>
        <CardDescription>
          Here is an analysis about the code submitted
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <Accordion type="multiple" className="w-full">
          {sections.map((section) => {
            const Icon = section.icon;
            const ItemIcon = section.iconForItem;

            return (
              <AccordionItem key={section.value} value={section.value}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-5 w-5 ${section.color}`} />
                    <span className="text-lg font-bold">{section.title}</span>
                    <Badge variant="outline" className="ml-2">
                      {analysis[section.dataKey].length} {section.badgeLabel}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2">
                  {analysis[section.dataKey].map((item, index) => (
                    <div key={index} className="flex gap-2 mb-3 text-sm">
                      <ItemIcon
                        className={`h-5 w-5 flex-shrink-0 ${section.color}`}
                      />
                      <p className="text-md">{item}</p>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
