"use client";

import { useAtom } from "jotai";
import { reportLoading, reportData } from "@/store/state";
import { GridLoader } from "react-spinners";
import { ReportData } from "./report-data";

export default function Report() {
  const [loading] = useAtom(reportLoading);
  const [data] = useAtom(reportData);
  if (loading) {
    return (
      <div className="w-9/12 p-8 flex items-center justify-center flex-col gap-4">
        <GridLoader
          color="#171717"
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
  if (data) {
    return (
      <div className="w-9/12 p-8 flex items-center justify-center flex-col gap-4">
        <ReportData data={data} />
      </div>
    );
  }
  return (
    <div className="w-9/12 p-8 flex items-center justify-center flex-col gap-4">
      <h2 className="text-6xl font-bold">Welcome to GroderAI</h2>
      <h3 className="text-3xl text-muted-foreground">
        Your code report will be shown here
      </h3>
    </div>
  );
}
