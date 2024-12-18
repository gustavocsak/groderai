import { atom } from "jotai";
import { ApiResponse } from "@/lib/types";

export const reportLoading = atom<boolean>(false);
export const reportData = atom<ApiResponse | null>(null);
