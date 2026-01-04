export interface DateDifferenceOptions {
  utc?: boolean;      // default: true
  signed?: boolean;   // default: false
  asObject?: boolean; // default: false
  includeTime?: boolean // default: false
}

export interface DateDifferenceResult {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function getDateDifference(
  startDate: Date | string | number,
  endDate: Date | string | number,
  options?: DateDifferenceOptions
): string | DateDifferenceResult;
