import { IDateRange } from "../interface/IDateRange";
import { DataPoint, EDangerLevel } from "./DataPoint";

export class DataPoints {
  dataPoints: DataPoint[];

  constructor(dataPoints: DataPoint[]) {
    this.dataPoints = this.sortByDate(dataPoints);
  }

  sortByDate = (dataPoints: DataPoint[]) => {
    return [...dataPoints].sort(function (a, b) {
      let dateA = a.date.getTime();
      let dateB = b.date.getTime();

      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
      return 0;
    });
  };

  filterByDateRange = (dateRange: IDateRange) => {
    if (!this.dataPoints || this.dataPoints.length === 0) {
      return new DataPoints([]);
    }
    const filteredPoints = this.dataPoints.filter((dataPoint) => {
      return (
        (dateRange.minDate ? dateRange.minDate < dataPoint.date : true) &&
        (dateRange.maxDate ? dateRange.maxDate > dataPoint.date : true)
      );
    });
    return new DataPoints(filteredPoints);
  };

  getLastDataPoint(): DataPoint | null {
    return this.dataPoints.reduce((a, b) => (a.date > b.date ? a : b));
  }

  getLastNonMissingDataPoint(): DataPoint | null {
    return this.dataPoints.reduce((a, b) => {
      if (!b.temp) {
        return a;
      }
      return a.date > b.date ? a : b;
    });
  }

  getFirstDataPoint(): DataPoint | null {
    return this.dataPoints.reduce((a, b) => (a.date < b.date ? a : b));
  }

  getLastDate(): Date | null {
    return this.getLastDataPoint()?.date || null;
  }

  getFirstDate(): Date | null {
    return this.getFirstDataPoint()?.date || null;
  }
  getMaxDataPoint(): DataPoint | null {
    return this.dataPoints.reduce((a, b) =>
      a.temp === null || b.temp === null || a.temp > b.temp ? a : b
    );
  }

  getMinDataPoint(): DataPoint | null {
    return this.dataPoints.reduce((a, b) =>
      a.temp === null || b.temp === null || a.temp < b.temp ? a : b
    );
  }

  getAverageTempFormatted(): string | null {
    const dataPointsWithoutNulls = this.dataPoints.filter(
      (dataPoint) => dataPoint.temp !== null
    );
    if (dataPointsWithoutNulls.length === 0) {
      return "Missing";
    }
    return (
      (
        Math.round(
          (dataPointsWithoutNulls.reduce(
            (sum, { temp }) => (temp ? sum + temp : sum),
            0
          ) /
            this.dataPoints.length) *
            100
        ) / 100
      ).toString() + "°C"
    );
  }

  getAverageTemp(): string | number | null {
    const dataPointsWithoutNulls = this.dataPoints.filter(
      (dataPoint) => dataPoint.temp !== null
    );
    if (dataPointsWithoutNulls.length === 0) {
      return "Missing";
    }
    return (
      Math.round(
        (dataPointsWithoutNulls.reduce(
          (sum, { temp }) => (temp ? sum + temp : sum),
          0
        ) /
          this.dataPoints.length) *
          100
      ) / 100
    );
  }
  // Todo tidy how we do this everywhere
  getAverageTempAcceptance(): string {
    const averageTemp = this.getAverageTemp();
    //if statements ... gotta go gfast
    if (averageTemp === "Missing" || !averageTemp) {
      return EDangerLevel.MISSING;
    }
    if (averageTemp <= 1) {
      return EDangerLevel.DANGER_LOW;
    }
    if (averageTemp <= 3) {
      return EDangerLevel.LOW;
    }
    if (averageTemp >= 9) {
      return EDangerLevel.DANGER_HIGH;
    }
    if (averageTemp >= 7) {
      return EDangerLevel.HIGH;
    }
    return EDangerLevel.SUITABLE;
  }

  getNullPoints(): DataPoints | null {
    return new DataPoints(
      this.dataPoints.filter((dataPoint) => dataPoint.temp === null)
    );
  }

  getNonNullPoints(): DataPoints | null {
    return new DataPoints(
      this.dataPoints.filter((dataPoint) => dataPoint.temp !== null)
    );
  }

  getNullPointsAcceptance(): string {
    const nullCount = this.getNullPoints()?.dataPoints?.length || 0;
    if (nullCount >= 1) {
      return "warning";
    }
    if (nullCount >= 10) {
      return "danger";
    }
    return "success";
  }
}
