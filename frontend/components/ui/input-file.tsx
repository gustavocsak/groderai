import * as React from "react";

import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";

const InputFile = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <div className="flex flex-row justify-between relative">
      <input
        type={type}
        className={cn(
          "block w-full text-sm text-foreground border rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-200",
          className,
        )}
        ref={ref}
        {...props}
      />
      <Upload className="absolute right-2 top-2 h-5 w-5 text-gray-400" />
    </div>
  );
});
InputFile.displayName = "Input";

export { InputFile };
