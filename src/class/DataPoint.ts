import { formatDateTime } from "../helper/dateHelper";

export enum EDangerLevel {
  DANGER_LOW = "danger",
  LOW = "warning",
  SUITABLE = "success",
  HIGH = "warning",
  DANGER_HIGH = "danger",
  MISSING = "warning",
}

export class DataPoint {
  date: Date;
  temp: number | null;

  constructor(date: Date, temp: number | null) {
    this.date = date;
    this.temp = temp;
  }

  getDangerLevel(): EDangerLevel {
    //if statements ... gotta go gfast
    if (!this.temp) {
      return EDangerLevel.MISSING;
    }
    if (this.temp <= 1) {
      return EDangerLevel.DANGER_LOW;
    }
    if (this.temp <= 3) {
      return EDangerLevel.LOW;
    }
    if (this.temp >= 9) {
      return EDangerLevel.DANGER_HIGH;
    }
    if (this.temp >= 7) {
      return EDangerLevel.HIGH;
    }
    return EDangerLevel.SUITABLE;
  }
  getFormattedDate(): string {
    return formatDateTime(this.date);
  }

  getFormattedTemp(): string {
    return !this.temp ? "Missing" : `${this.temp.toString()}°C`;
  }

  isMissing(): boolean {
    return !this.temp;
  }

  getStartOfHour(): Date {
    let startOfHour = new Date(this.date);
    startOfHour.setMinutes(0);
    startOfHour.setSeconds(0);
    return startOfHour;
  }
}
