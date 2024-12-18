import { Method } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MethodCardProps {
  methods: Method[];
}

export default function MethodCard({ methods }: MethodCardProps) {
  return (
    <Card className="h-full overflow-auto">
      <CardHeader>
        <CardTitle className="text-xl">Methods</CardTitle>
        <CardDescription>
          Here are the methods/functions that were identified in your code file
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-1">
          <Accordion type="single" collapsible className="w-full">
            {methods.map((method, idx) => (
              <AccordionItem key={idx} value={`method-${idx}`}>
                <AccordionTrigger>{method.prototype}</AccordionTrigger>
                <AccordionContent>
                  <p>prototype: {method.prototype}</p>
                  <p>expected: {method.expected_prototype}</p>
                  <p>correct: {method.is_correct}</p>
                  <p>documented: {method.is_documented}</p>
                  <p>time complexity: {method.time_complexity}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
