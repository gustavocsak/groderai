import { currentFile, reportData } from "@/store/state";
import { useAtom } from "jotai";
import { Button } from "./ui/button";
import { File } from "lucide-react";
import { Student } from "@/lib/types";

import { testdata } from "@/lib/types";
import ExportFormTrigger from "./export-form-trigger";

export default function FileView() {
  const [data] = useAtom(reportData);
  const [current, setCurrent] = useAtom(currentFile);

  function handleFileClick(student: Student) {
    setCurrent(student);
  }

  if (testdata) {
    return (
      <div className="flex flex-col justify-between h-full p-4">
        <div className="flex flex-col space-y-1">
          {testdata.students.map((student) => (
            <Button
              variant={current == student ? "outline" : "ghost"}
              key={student.name}
              className="justify-start"
              onClick={() => handleFileClick(student)}
            >
              <File />
              {student.filename}
            </Button>
          ))}
        </div>
        <div>
          <ExportFormTrigger />
          {/* <Button className="w-full" variant="default">
            Export to File
          </Button> */}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-1 p-4">
      Files that you submit for analysis will appear here
    </div>
  );
}
