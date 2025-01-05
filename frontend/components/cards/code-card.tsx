import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CodeViewer from "../code-viewer";

interface CodeCardProps {
  code: string;
}

export default function CodeCard({ code }: CodeCardProps) {
  console.log(code);
  return (
    <Card className="h-full overflow-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Plain Code</CardTitle>
        <CardDescription>
          Here is the code for this specific file
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* TODO: fix sizing */}
        <CodeViewer content={code} language="java" />
      </CardContent>
    </Card>
  );
}
