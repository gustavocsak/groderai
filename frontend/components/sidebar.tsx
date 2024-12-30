import AnalyzeForm from "./analyze-form";

export default function Sidebar() {
  return (
    <div className="flex flex-col w-3/12 p-8 gap-4 border-r h-full">
      <AnalyzeForm />
    </div>
  );
}
