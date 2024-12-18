import { atom } from "jotai";
import { ApiResponse } from "@/utils/types";

export const reportLoading = atom<boolean>(false);
export const reportData = atom<ApiResponse | null>(null);
