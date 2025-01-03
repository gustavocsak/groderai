import { Method } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MethodUnit from "./method-unit";

interface MethodCardProps {
  methods: Method[];
}

export default function MethodCard({ methods }: MethodCardProps) {
  return (
    <Card className="h-full overflow-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Methods</CardTitle>
        <CardDescription>
          Here are the methods/functions that were identified in your code file
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-1">
          {methods.map((method, idx) => (
            <MethodUnit
              key={idx}
              prototype={method.prototype}
              expected_prototype={method.expected_prototype}
              is_correct={method.is_correct}
              is_documented={method.is_documented}
              time_complexity={method.time_complexity}
              errors={method.errors}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
