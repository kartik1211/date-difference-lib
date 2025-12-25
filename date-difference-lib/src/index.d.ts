export interface DateDifferenceOptions {
  utc?: boolean;      // default: true
  signed?: boolean;   // default: false
  asObject?: boolean; // default: false
}

export interface DateDifferenceResult {
  years: number;
  months: number;
  days: number;
}

export function getDateDifference(
  startDate: Date | string | number,
  endDate: Date | string | number,
  options?: DateDifferenceOptions
): string | DateDifferenceResult;
