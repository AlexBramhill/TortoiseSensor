import { formatDateTime } from "../helper/dateHelper";

export class DataPoint {
  date: Date;
  temp: number | null;

  constructor(date: Date, temp: number | null) {
    this.date = date;
    this.temp = temp;
  }

  getFormattedTemp = (): string => {
    if (this.temp === null) {
      return "N/A";
    }
    return (this.temp * 10) / 10 + "°";
  };

  getFormattedDate = (): string => {
    return formatDateTime(this.date);
  };

  getStartOfHour = (): Date => {
    let startOfHour = new Date(this.date);
    startOfHour.setMinutes(0);
    startOfHour.setSeconds(0);
    return startOfHour;
  };
}
