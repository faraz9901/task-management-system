import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"
import { extractError } from "./api"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const onError = (error: unknown) => toast.error(extractError(error));
