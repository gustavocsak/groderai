import { UseFormRegisterReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputFile } from "./ui/input-file";

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
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
}
