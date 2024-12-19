import Report from "@/components/report";
import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
    <div className="flex flex-row h-full">
      <Sidebar />
      <Report />
    </div>
  );
}
