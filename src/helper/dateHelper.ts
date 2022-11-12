export const ONE_DAY = 1 * 24 * 60 * 60 * 1000;
export const ONE_HOUR = 1 * 1 * 60 * 60 * 1000;

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

export const formatDateTime = (date: Date): string => {
  return formatTime(date) + " " + formatDate(date);
};
export const formatDateTimeReversed = (date: Date): string => {
  return date.toLocaleString("en-GB");
};
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-GB");
};
export const formatDay = (date: Date): string => {
  return daysOfWeek[date.getDay()];
};
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const startOfDay = (date: Date): Date => {
  let tempDate = new Date(date);
  tempDate.setHours(0, 0, 0);
  return tempDate;
};

export const startOfHour = (date: Date): Date => {
  let tempDate = new Date(date);
  tempDate.setMinutes(0, 0);
  return tempDate;
};

export const endOfDay = (date: Date): Date => {
  let tempDate = new Date(date);
  tempDate.setHours(24, 0, 0);
  return tempDate;
};

export const addDays = (date: Date, days: number): Date => {
  let tempDate = new Date(date);
  tempDate.setDate(tempDate.getDate() + days);
  return tempDate;
};

export const amountOfDaysBetweenDates = (
  startDate: Date,
  endDate: Date
): number => {
  return Math.floor(endDate.getTime() - startDate.getTime()) / ONE_DAY;
};

export const amountOfHoursBetweenDates = (
  startDate: Date,
  endDate: Date
): number => {
  return Math.floor(endDate.getTime() - startDate.getTime()) / ONE_HOUR;
};

export const daysBetweenDates = (startDate: Date, endDate: Date): Date[] => {
  let daysBetween: Date[] = [];
  const amountOfDays = amountOfDaysBetweenDates(startDate, endDate);
  for (let i = 1; i <= amountOfDays; i++) {
    daysBetween.push(new Date(startOfDay(startDate).getTime() + i * ONE_DAY));
  }
  return daysBetween;
};
export const hoursBetweenDates = (startDate: Date, endDate: Date): Date[] => {
  let hoursBetween: Date[] = [];
  const amountOfHours = amountOfHoursBetweenDates(startDate, endDate);
  for (let i = 1; i <= amountOfHours; i++) {
    hoursBetween.push(
      new Date(startOfHour(startDate).getTime() + i * ONE_HOUR)
    );
  }
  return hoursBetween;
};
