import { clsx, ClassValue } from 'clsx'
import { twMerge, ClassNameValue } from 'tailwind-merge'

export function mergeClasses(...classes: ClassValue[]) {
  return twMerge(clsx(...classes))
}
