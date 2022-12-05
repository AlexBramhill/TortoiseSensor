import { DataPoint } from "../class/DataPoint";

export const getLastDataPoint = (dataPoints: DataPoint[] | null) => {
  if (!dataPoints || dataPoints.length === 0) {
    return null;
  }
  return dataPoints?.reduce((a, b) => (a.date > b.date ? a : b)) || null;
};

export const getFirstDataPoint = (dataPoints: DataPoint[] | null) => {
  if (!dataPoints || dataPoints.length === 0) {
    return null;
  }
  return dataPoints?.reduce((a, b) => (a.date < b.date ? a : b) || null);
};
