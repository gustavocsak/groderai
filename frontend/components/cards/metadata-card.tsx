import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "@/lib/types";

interface MetadataProps {
  metadata: Metadata;
}

export default function MetadataCard({ metadata }: MetadataProps) {
  return (
    <Card className="h-full overflow-auto">
      <CardHeader>
        <CardTitle className="text-xl">Metadata</CardTitle>
        <CardDescription>
          Here is a quick rundown about your assignment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-1">
          <h3 className="text-md font-bold">{metadata.title}</h3>
          <h4 className="text-md">{metadata.description}</h4>
        </div>
        <div className="space-y-1">
          <h3 className="text-md font-bold">Language</h3>
          <h4 className="text-md">{metadata.language}</h4>
        </div>
        <div className="space-y-1">
          <h3 className="text-md font-bold">Requirements:</h3>
          {metadata.requirements.map((item, idx) => (
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
