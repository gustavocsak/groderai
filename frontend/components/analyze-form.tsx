"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import FileUpload from "./file-upload";

const formSchema = z.object({
  // thanks to https://medium.com/@damien_16960/input-file-x-shadcn-x-zod-88f0472c2b81
  instructions:
    typeof window === "undefined" ? z.any() : z.instanceof(FileList),
  code: typeof window === "undefined" ? z.any() : z.instanceof(FileList),
});

export default function AnalyzeForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
