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

export const addDays = (date: Date, days: number): Date => {
  let tempDate = new Date(date);
  tempDate.setDate(tempDate.getDate() + days);
  return tempDate;
};

export const minusDays = (date: Date, days: number): Date => {
  return addDays(date, -days);
};
