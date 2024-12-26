import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MethodCard from "./cards/method-card";
import AnalysisCard from "./cards/analysis-card";
import MetadataCard from "./cards/metadata-card";
import { ApiResponse } from "@/lib/types";

interface ReportDataProps {
  data: ApiResponse;
}

export function ReportData({ data }: ReportDataProps) {
  return (
    <Tabs defaultValue="metadata" className="flex flex-col w-11/12 h-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="metadata">Metadata</TabsTrigger>
        <TabsTrigger value="code-analysis">Code Analysis</TabsTrigger>
        <TabsTrigger value="methods">Methods</TabsTrigger>
      </TabsList>
      <TabsContent value="metadata" className="flex-1 overflow-hidden">
        <MetadataCard metadata={data.metadata} />
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
