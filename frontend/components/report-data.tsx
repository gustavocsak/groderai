import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MethodCard from "./cards/method-card";
import AnalysisCard from "./cards/analysis-card";
import SummaryCard from "@/components/cards/summary-card";
import { Student } from "@/lib/types";

interface ReportDataProps {
  data: Student;
}

export function ReportData({ data }: ReportDataProps) {
  return (
    <Tabs
      defaultValue="summary"
      className="flex flex-col w-11/12 h-full max-h-full"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="code-analysis">Code Analysis</TabsTrigger>
        <TabsTrigger value="methods">Methods</TabsTrigger>
      </TabsList>
      <TabsContent value="summary" className="flex-1 overflow-hidden">
        <SummaryCard summary={data.summary} />
      </TabsContent>
      <TabsContent value="code-analysis" className="flex-1">
        <AnalysisCard analysis={data.code_analysis} />
      </TabsContent>
      <TabsContent value="methods" className="flex-1">
        <MethodCard methods={data.methods} />
      </TabsContent>
    </Tabs>
  );
}
