import {
  getDangerLevelSpecByNullPointCount,
  IDangerLevelNullPoint,
} from "../interface/IDangerLevelNullPoints";
import {
  getDangerLevelSpecByTemp,
  IDangerLevelTemp,
} from "../interface/IDangerLevelTemperature";
import { IDateRange } from "../interface/IDateRange";
import { DataPoint } from "./DataPoint";

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
    const dataPointCollection = this.getNonNullPoints();
    if (!dataPointCollection || dataPointCollection.dataPoints.length === 0) {
      return null;
    }
    return dataPointCollection.dataPoints.reduce((a, b) =>
      a.temp === null || b.temp === null || a.temp > b.temp ? a : b
    );
  }

  getMinDataPoint(): DataPoint | null {
    const dataPointCollection = this.getNonNullPoints();
    if (!dataPointCollection || dataPointCollection.dataPoints.length === 0) {
      return null;
    }
    return dataPointCollection.dataPoints.reduce((a, b) =>
      a.temp === null || b.temp === null || a.temp < b.temp ? a : b
    );
  }

  getAverageTempFormatted(): string | null {
    const averageTempUnformatted = this.getAverageTemp();
    if (!averageTempUnformatted) {
      return "Missing";
    }
    return `${(Math.round(averageTempUnformatted * 100) / 100).toString()}°C`;
  }

  getAverageTemp(): number | null {
    const dataPointsWithoutNulls = this.getNonNullPoints()?.dataPoints;
    if (!dataPointsWithoutNulls || dataPointsWithoutNulls.length === 0) {
      return null;
    }
    return (
      dataPointsWithoutNulls.reduce(
        (sum, { temp }) => (temp ? sum + temp : sum),
        0
      ) / this.dataPoints.length
    );
  }

  getAverageTempDangerLevelSpec(): IDangerLevelTemp {
    const averageTemp = this.getAverageTemp();
    return getDangerLevelSpecByTemp(averageTemp);
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

  getNullPointsDangerLevelSpec(): IDangerLevelNullPoint {
    const nullCount = this.getNullPoints()?.dataPoints?.length || 0;
    return getDangerLevelSpecByNullPointCount(nullCount);
  }
}
