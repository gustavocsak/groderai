import { UseFormRegisterReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputFile } from "./ui/input-file";
import { Upload } from "lucide-react";

interface FileUploadProps {
  fileName: string;
  description: string;
  ref: UseFormRegisterReturn;
}

export default function FileUpload({
  fileName,
  description,
  ref,
}: FileUploadProps) {
  return (
    <FormItem>
      <FormLabel className="text-base">{fileName}</FormLabel>
      <FormControl>
        <InputFile id={fileName} type="file" {...ref} />
      </FormControl>
      <Upload className="absolute right-2 top-2 h-5 w-5 text-gray-400" />
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
}
