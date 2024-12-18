"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import FileUpload from "./file-upload";
import axios from "axios";
import { useSetAtom } from "jotai";
import { reportData, reportLoading } from "@/store/state";

const formSchema = z.object({
  // thanks to https://medium.com/@damien_16960/input-file-x-shadcn-x-zod-88f0472c2b81
  instructions:
    typeof window === "undefined" ? z.any() : z.instanceof(FileList),
  code: typeof window === "undefined" ? z.any() : z.instanceof(FileList),
});

export default function AnalyzeForm() {
  const setLoading = useSetAtom(reportLoading);
  const setData = useSetAtom(reportData);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("instructions", values.instructions[0]);
      formData.append("code", values.code[0]);

      console.log(formData);

      const response = await axios.post("/api/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  }

  const instructionsRef = form.register("instructions");
  const codeRef = form.register("code");

  return (
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
  );
}
