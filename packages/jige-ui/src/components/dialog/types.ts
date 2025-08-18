export interface DialogInst {
  id: string;
  title: string;
  type: 'success' | 'warning' | 'error' | 'info';
  content: string;
  positiveText?: string;
  negativeText?: string;
  onPositiveClick?: () => void | Promise<void>;
  onNegativeClick?: () => void | Promise<void>;
}

export interface DialogFactory {
  error: ((conf: Omit<DialogInst, 'type' | 'id'>) => void) &
    ((content: string) => void);
  success: ((conf: Omit<DialogInst, 'type' | 'id'>) => void) &
    ((content: string) => void);
  warning: ((conf: Omit<DialogInst, 'type' | 'id'>) => void) &
    ((content: string) => void);
  info: ((conf: Omit<DialogInst, 'type' | 'id'>) => void) &
    ((content: string) => void);
}
