"use client";

import { useAtom } from "jotai";
import { reportLoading, reportData } from "@/store/state";

export default function Report() {
  const [loading] = useAtom(reportLoading);
  const [data] = useAtom(reportData);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (data) {
    return <p>{data.metadata.title}</p>;
  }
  return (
    <div className="w-9/12">
      <h2>Report</h2>
    </div>
  );
}
