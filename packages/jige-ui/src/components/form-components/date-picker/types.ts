export type DatePickerType = "date" | "datetime";

export type DatePickerPreviewer = {
  toPreview: (timestamp: number | null, type: DatePickerType) => string;
  toTimestamp: (preview: string, type: DatePickerType) => number | null;
};

export type DatePickerToValueFunc<T> = (timestamp: number | null) => T;
