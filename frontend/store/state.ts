import { atom } from "jotai";
import { ApiResponse, Student } from "@/lib/types";

export const reportLoading = atom<boolean>(false);
export const reportData = atom<ApiResponse | null>(null);

// For now leaving as student here, might change to a File type later
export const currentFile = atom<Student | null>(null);
