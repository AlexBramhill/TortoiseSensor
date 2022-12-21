import { formatDateTime } from "../helper/dateHelper";
import {
  getDangerLevelSpecByTemp,
  IDangerLevelTemp,
} from "../interface/IDangerLevelTemperature";

export class DataPoint {
  date: Date;
  temp: number | null;

  constructor(date: Date, temp: number | null) {
    this.date = date;
    this.temp = temp;
  }

  getDangerLevelSpec(): IDangerLevelTemp {
    return getDangerLevelSpecByTemp(this.temp);
  }
  getFormattedDate(): string {
    return formatDateTime(this.date);
  }

  getFormattedTemp(): string {
    if (!this.temp) {
      return "Missing";
    }
    return `${(Math.round(this.temp * 100) / 100).toString()}°C`;
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
