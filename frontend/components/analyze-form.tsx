"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import FileUpload from "./file-upload";
import axios from "axios";
import { useSetAtom } from "jotai";
import { currentFile, reportData, reportLoading } from "@/store/state";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const formSchema = z.object({
  // thanks to https://medium.com/@damien_16960/input-file-x-shadcn-x-zod-88f0472c2b81
  instructions: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: "Instructions file is required.",
    })
    .refine((files) => files[0] && files[0].size <= MAX_FILE_SIZE, {
      message: "Instructions file must not exceed 5 MB.",
    }),
  code: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: "Code file is required.",
    })
    .refine((files) => files[0] && files[0].size <= MAX_FILE_SIZE, {
      message: "Code file must not exceed 5 MB.",
    }),
});

export default function AnalyzeForm() {
  const setLoading = useSetAtom(reportLoading);
  const setData = useSetAtom(reportData);
  const setCurrent = useSetAtom(currentFile);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("instructions", values.instructions[0]);
      formData.append("code", values.code[0]);

      const response = await axios.post("/api/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setData(response.data);

      //TODO: handle this better
      setCurrent(response.data.students[0]);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  }

  const instructionsRef = form.register("instructions");
  const codeRef = form.register("code");

  return (
    <div className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FileUpload
                fileName="instructions"
                description="Add your assignment instructions here"
                ref={instructionsRef}
              />
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FileUpload
                fileName="code"
                description="Add the code to be analyzed here"
                ref={codeRef}
              />
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
