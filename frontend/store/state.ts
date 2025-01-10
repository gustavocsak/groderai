import { atom } from "jotai";
import { ApiResponse, Student } from "@/lib/types";

export const reportLoading = atom<boolean>(false);
export const reportLoadingProgress = atom<number>(0);
export const reportData = atom<ApiResponse | null>(null);
export const loadingTextAtom = atom<string>("");

// For now leaving as student here, might change to a File type later
export const currentFile = atom<Student | null>(null);
