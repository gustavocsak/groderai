import { Input } from "./ui/input";
import { UseFormRegisterReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
      <FormLabel>{fileName}</FormLabel>
      <FormControl>
        <Input id={fileName} type="file" {...ref} />
      </FormControl>
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
}
