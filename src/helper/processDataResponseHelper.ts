import { DataPoint } from "../class/DataPoint";

export const processRawDataPoint = (rawDataPoint: [number, string | null]) => {
  const date = new Date(rawDataPoint[0] * 1000);
  const temp = rawDataPoint[1] === null ? null : Number(rawDataPoint[1]);
  return new DataPoint(date, temp);
};

export const processRawDataPoints = (
  rawDataPoints: [[number, string | null]]
) => {
  let tempList: DataPoint[] = [];
  rawDataPoints.forEach((point) => {
    tempList.push(processRawDataPoint(point));
  });
  return tempList;
};
