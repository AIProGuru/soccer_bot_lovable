
import { Toast } from "@/components/ui/toast";
import { useToast as useToastOriginal } from "@/hooks/use-toast";

export type ToastType = ReturnType<typeof useToastOriginal>;

export { useToastOriginal as useToast };
