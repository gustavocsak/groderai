import Report from "@/components/report";
import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import SidebarLeft from "@/components/sidebar-left";

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "400px",
        } as React.CSSProperties
      }
    >
      <SidebarLeft />
      <SidebarInset className="overflow-hidden">
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Navbar />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 justify-center items-center w-full">
          <Report />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
