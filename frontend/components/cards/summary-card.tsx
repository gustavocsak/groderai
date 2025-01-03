import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SummaryProps {
  summary: string[];
}

export default function SummaryCard({ summary }: SummaryProps) {
  return (
    <Card className="h-full overflow-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Summary</CardTitle>
        <CardDescription>
          Here is a quick summary about the code submitted
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-1">
          <h3 className="text-md font-bold">Requirements:</h3>
          {summary.map((item, idx) => (
            <p key={idx} className="text-md">
              {item}
            </p>
          ))}
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
