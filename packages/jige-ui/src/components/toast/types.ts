export type ToastType = "success" | "warning" | "error" | "info";

export type ToastInst = {
  id: string;
  title: string;
  type: ToastType;
  content: string;
  timeout?: number;
};

export type ToastFactory = {
  error: ((conf: Omit<ToastInst, "type" | "id">) => void) &
    ((content: string) => void);
  success: ((conf: Omit<ToastInst, "type" | "id">) => void) &
    ((content: string) => void);
  warning: ((conf: Omit<ToastInst, "type" | "id">) => void) &
    ((content: string) => void);
  info: ((conf: Omit<ToastInst, "type" | "id">) => void) &
    ((content: string) => void);
};
