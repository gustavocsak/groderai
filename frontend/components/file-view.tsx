// import { ApiResponse } from "@/lib/types";
import { reportData } from "@/store/state";
import { useAtom } from "jotai";
import { Button } from "./ui/button";
import { File } from "lucide-react";

// interface FileViewProps {
//   data: ApiResponse;
// }

export default function FileView() {
  const [data] = useAtom(reportData);

  if (data) {
    return (
      <div className="flex flex-col space-y-1 p-4">
        {data.students.map((student) => (
          <Button variant="ghost" key={student.name} className="justify-start">
            <File />
            {student.filename}
          </Button>
        ))}
      </div>
    );
  }

  return <p>no data</p>;
}
