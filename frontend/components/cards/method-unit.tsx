import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, FileCode, FileX, XCircle } from "lucide-react";

interface MethodCardProps {
  prototype: string;
  expected_prototype: string;
  is_correct: boolean;
  is_documented: boolean;
  time_complexity: string;
  errors: string[];
}

export default function MethodUnit({
  prototype,
  expected_prototype,
  is_correct,
  is_documented,
  time_complexity,
  errors,
}: MethodCardProps) {
  return (
    <div className="border rounded-lg p-4 space-y-4 hover:bg-accent/50 transition-colors">
      <div className="flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {prototype != "N/A" ? prototype : expected_prototype}
        </code>
        <div className="flex gap-2">
          <Badge
            variant={is_correct ? "success" : "destructive"}
            className="font-mono"
          >
            {is_correct ? (
              <CheckCircle2 className="mr-1 h-3 w-3" />
            ) : (
              <XCircle className="mr-1 h-3 w-3" />
            )}
            {is_correct ? "Correct" : "Incorrect"}
          </Badge>
          <Badge
            variant={is_documented ? "success" : "destructive"}
            className="font-mono"
          >
            {is_documented ? (
              <FileCode className="mr-1 h-3 w-3" />
            ) : (
              <FileX className="mr-1 h-3 w-3" />
            )}
            {is_documented ? "Documented" : "Undocumented"}
          </Badge>
          <Badge variant="outline" className="font-mono">
            <Clock className="mr-1 h-3 w-3" />
            {time_complexity}
          </Badge>
        </div>
      </div>
      {errors.length > 0 && (
        <div className="space-y-2">
          {errors.map((error, index) => (
            <div
              key={index}
              className="text-sm text-muted-foreground rounded-lg"
            >
              • {error}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
