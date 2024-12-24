import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CodeAnalysis } from "@/lib/types";

interface AnalysisCardProps {
  analysis: CodeAnalysis;
}

// move this to utils later
function formatCategory(category: string) {
  category = category.charAt(0).toUpperCase() + category.slice(1);
  return category.replace("_", " ");
}

export default function AnalysisCard({ analysis }: AnalysisCardProps) {
  return (
    <Card className="h-full overflow-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Code Analysis</CardTitle>
        <CardDescription>
          Here is an analysis about the code submitted
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {Object.entries(analysis).map(([category, items]) => (
          <div key={category} className="space-y-1">
            <h3 className="font-bold text-md">{formatCategory(category)}</h3>
            <ul>
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
