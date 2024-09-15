import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  return `${day}/${month}/${year}`;
}

export function parseDate(text: string) {
  const [day, month, year] = text.split("/")

  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
}

export function getWeekday(date: Date) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;
  return days[date.getDay()]
}

export type WeekDay = ReturnType<typeof getWeekday>

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}