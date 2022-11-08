import { DataPoint } from "../class/DataPoint";
import { getDummyData } from "../dummyData/dimmyData";
import { processRawDataPoints } from "../helper/processDataResponseHelper";

export const getLatestTemperatures = (): Promise<DataPoint[]> => {
  if (process.env.NODE_ENV === "development") {
    return handleDevRequest();
  }

  return fetch(`${process.env.REACT_APP_DEFAULT_URL}/latest`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      return processRawDataPoints(data);
    });
};
export const getAllTemperatures = () => {
  if (process.env.NODE_ENV === "development") {
    return handleDevRequest();
  }

  return fetch(`${process.env.REACT_APP_DEFAULT_URL}/all`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      return processRawDataPoints(data);
    });
};

const handleDevRequest = (): Promise<DataPoint[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getDummyData());
    }, 1000);
  });
};
