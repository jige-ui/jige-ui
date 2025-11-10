import {
  addDays,
  type DateArgs,
  endOfMonth,
  formatToDateTime,
  getDay,
  getWeekday,
  parseDate,
} from "time-core";

/**
 * Generate the days of the year and the month
 * It generates 42 days to make sure it is a 7 * 6 grid, which is the common calendar layout
 */
export function genCalendarDays(year: number, month: number): Date[] {
  const days: Date[] = [];

  const firstDay = parseDate(`${year}-${month}-01`);
  const lastDay = endOfMonth(firstDay);
  const firstDayWeekday = getWeekday(firstDay);
  const lastDayWeekday = getWeekday(lastDay);

  // fill the days before the first day of the month
  for (let i = firstDayWeekday; i > 0; i--) {
    days.push(addDays(firstDay, -i));
  }

  // fill the days of the month
  for (let i = 0; i < getDay(lastDay); i++) {
    days.push(addDays(firstDay, i));
  }

  // fill the days after the last day of the month
  for (let i = 1; i <= 6 - lastDayWeekday; i++) {
    days.push(addDays(lastDay, i));
  }

  // make sure it is a 7 * 6 grid
  if (days.length < 42) {
    const len = days.length;

    const lastDayjs = days.at(-1);
    for (let i = 1; i <= 42 - len; i++) {
      lastDayjs && days.push(addDays(lastDayjs, i));
    }
  }

  return days;
}

/**
 * Generate the years around the reference year
 * @param refYear the reference year
 * @param count the count of years
 */
export function genYears(refYear: number, count = 12): number[] {
  const years: number[] = [];
  const startYear = Math.floor(refYear / count) * count;
  for (let i = 0; i < count; i++) {
    years.push(startYear + i);
  }
  return years;
}

export function NumberToChinese(num: number) {
  const arr1 = [
    "日",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
    "十一",
    "十二",
  ];
  return arr1[num];
}

const timeRegex = /^(0\d|1\d|2[0-3])(:[0-5]\d){0,2}$/;
export function checkTimeValue(
  value: string,
  timeType: "hour" | "minute" | "second" | "ignore" = "ignore"
) {
  let length = 0;
  if (timeType === "hour") {
    length = 2;
  } else if (timeType === "minute") {
    length = 5;
  } else if (timeType === "second") {
    length = 8;
  }

  if (length && value?.length !== length) {
    return false;
  }

  return timeRegex.test(value);
}

export function formatToDateStr(date: DateArgs) {
  return formatToDateTime(date).split(" ")[0];
}

export function pad(n: number, width = 2) {
  return n.toString().padStart(width, "0");
}
