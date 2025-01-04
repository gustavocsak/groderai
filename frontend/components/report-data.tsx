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
      className="flex flex-col h-full w-11/12 overflow-auto"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="code-analysis">Code Analysis</TabsTrigger>
        <TabsTrigger value="methods">Methods</TabsTrigger>
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
    </Tabs>
  );
}
