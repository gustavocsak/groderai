"use client";

import { useAtom } from "jotai";
import { reportLoading, reportData, currentFile } from "@/store/state";
import { GridLoader } from "react-spinners";
import { ReportData } from "./report-data";

export default function Report() {
  const [loading] = useAtom(reportLoading);
  const [data] = useAtom(reportData);
  const [current] = useAtom(currentFile);

  if (loading) {
    return (
      <div className="w-9/12 p-8 flex items-center justify-center flex-col gap-4">
        <GridLoader
          color="#e11d48"
          size={17}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
  if (data && current) {
    return <ReportData data={current} />;
  }
  return (
    <div className="w-9/12 p-8 flex items-center justify-center flex-col gap-4">
      <h2 className="text-6xl font-bold tracking-tight">Welcome to GroderAI</h2>
      <h3 className="text-3xl text-muted-foreground">
        Your code report will be shown here
      </h3>
    </div>
  );
}
