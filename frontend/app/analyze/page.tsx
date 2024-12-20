import Report from "@/components/report";
import Sidebar from "@/components/sidebar";
import ThemeToggle from "@/components/theme-toggle";

export default function Home() {

  return (
    <div className="flex flex-col h-full">
      <nav className="w-full p-4 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold">GroderAI</h1>
        <ThemeToggle />
      </nav>

      <div className="flex flex-row flex-1">
        <Sidebar />
        <Report />
      </div>
    </div>
  );
}
