import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Student } from "@/lib/types";
import { CircleCheck, UserRound } from "lucide-react";
import { FileText } from "lucide-react";
import { studentToMarkdown, studentToText } from "@/lib/utils";
import { SummaryCopy } from "../summary-copy";

interface SummaryProps {
  student: Student;
}

export default function SummaryCard({ student }: SummaryProps) {
  const totalMethods = student.methods.length;
  const correctMethods = student.methods.filter((m) => m.is_correct).length;
  const documentedMethods = student.methods.filter(
    (m) => m.is_documented,
  ).length;
  const summaryContent = studentToText(student);
  const markdown = studentToMarkdown(student);
  return (
    <Card className="h-full overflow-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Summary</CardTitle>
        <CardDescription>
          Here is a quick summary about the code submitted
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <div className="flex items-center space-x-2 text-lg font-bold">
            <UserRound className="h-4 w-4" />
            <span>{student.name}</span>
          </div>
          <div className="flex items-center space-x-2 text-md text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>{student.filename}</span>
          </div>
        </div>
        <div className="space-y-2 font-bold">
          <h3 className="text-lg font-semibold mb-2">
            Methods in file: {totalMethods}
          </h3>
          <div className="flex gap-2">
            <CircleCheck color="green" />
            {correctMethods} / {totalMethods} correct
          </div>
          <div className="flex gap-2">
            <CircleCheck color="green" />
            {documentedMethods} / {totalMethods} documented
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold mb-2">Notes: </h3>
          {student.summary.map((entry, index) => (
            <p key={index}>{entry.substring(0, 150)}</p>
          ))}
        </div>

        <SummaryCopy markdown={markdown} text={summaryContent} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
