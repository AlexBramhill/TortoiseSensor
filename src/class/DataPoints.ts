import { IDateRange } from "../interface/IDateRange";
import { DataPoint } from "./DataPoint";

export class DataPoints {
  dataPoints: DataPoint[];

  constructor(dataPoints: DataPoint[]) {
    this.dataPoints = dataPoints;
  }

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

  getAverageTemp(): string | null {
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
    ).toString();
  }
  getNullPoints(): DataPoints | null {
    return new DataPoints(
      this.dataPoints.filter((dataPoint) => dataPoint.temp === null)
    );
  }
}
