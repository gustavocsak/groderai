import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MethodCard from "./cards/method-card";
import AnalysisCard from "./cards/analysis-card";
import SummaryCard from "@/components/cards/summary-card";
import { Student } from "@/lib/types";
import CodeCard from "./cards/code-card";

interface ReportDataProps {
  data: Student;
}

export function ReportData({ data }: ReportDataProps) {
  return (
    <Tabs
      defaultValue="summary"
      className="flex flex-col h-full w-full max-w-full"
    >
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="code-analysis">Code Analysis</TabsTrigger>
        <TabsTrigger value="methods">Methods</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="summary" className="flex-1">
        <SummaryCard student={data} />
      </TabsContent>
      <TabsContent value="code-analysis" className="flex-1">
        <AnalysisCard analysis={data.code_analysis} />
      </TabsContent>
      <TabsContent value="methods" className="flex-1">
        <MethodCard methods={data.methods} />
      </TabsContent>
      <TabsContent value="code" className="flex-1">
        <CodeCard code={data.code} />
      </TabsContent>
    </Tabs>
  );
}
