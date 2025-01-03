import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTriggerSimple,
} from "@/components/ui/tabs";
import CodeViewer from "./code-viewer";

interface SummaryCopyProps {
  markdown: string;
  text: string;
}

export function SummaryCopy({ markdown, text }: SummaryCopyProps) {
  return (
    <Tabs defaultValue="markdown" className="relative mt-12 w-full">
      <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
        <TabsTriggerSimple value="markdown">Markdown</TabsTriggerSimple>
        <TabsTriggerSimple value="text">Plain text</TabsTriggerSimple>
      </TabsList>
      <TabsContent value="markdown" className="flex-1 overflow-hidden">
        <CodeViewer content={markdown} />
      </TabsContent>
      <TabsContent value="text" className="flex-1">
        <CodeViewer content={text} />
      </TabsContent>
    </Tabs>
  );
}
