"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import FileUpload from "./file-upload";
import { useSetAtom, atom, useAtom } from "jotai";
import {
  currentFile,
  reportData,
  reportLoading,
  reportLoadingProgress,
  loadingTextAtom,
} from "@/store/state";
import { useState, useEffect, useCallback } from "react";
import { ApiResponse } from "@/lib/types";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

interface DataStatusProps {}

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

const taskStartedAtom = atom(false);

export default function AnalyzeForm() {
  const setLoading = useSetAtom(reportLoading);
  const setData = useSetAtom(reportData);
  const setCurrent = useSetAtom(currentFile);
  const setProgress = useSetAtom(reportLoadingProgress);
  const [taskStarted, setTaskStarted] = useAtom(taskStartedAtom);
  const setLoadingText = useSetAtom(loadingTextAtom);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      setLoadingText("Analyzing files... This may take a while.");
      const formData = new FormData();
      formData.append("instructions", values.instructions[0]);
      formData.append("code", values.code[0]);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
        keepalive: true,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
      setTaskStarted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  const handleDataStatus = useCallback((data) => {
    if (!data.task_done) {
      setProgress(data.progress);
      setLoadingText(`${data.batch} batches analyzed...`);
      return;
    }

    data = data.data;
    setTaskStarted(false); // Set taskStarted to false after processing
    setLoading(false);
    if (Array.isArray(data.students) && data.students.length > 0) {
      setData(data);
      setCurrent(data.students[0]);
    } else {
      console.warn("No students found in the response.");
      setData(null);
      setCurrent(null);
    }
  }, []);

  useEffect(() => {
    if (!taskStarted) return; // Do not start polling if task is not started

    const interval = setInterval(async () => {
      try {
        const response = await fetch("api/status");
        const data = await response.json();
        console.log("Response Text:", response);

        handleDataStatus(data);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    }, 2000); // Poll every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [taskStarted, handleDataStatus]);

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
