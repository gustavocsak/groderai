import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ExportForm from "./export-form";

export default function ExportFormTrigger() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Export Report</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Export Report</DialogTitle>
          <DialogDescription>
            Choose report types and format for export.
          </DialogDescription>
        </DialogHeader>
        <ExportForm />
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
