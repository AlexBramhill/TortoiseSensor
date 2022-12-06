import { DataPoints } from "../class/DataPoints";
import { getDummyData } from "../dummyData/dummyData";
import { processRawDataPoints } from "../helper/processDataResponseHelper";

export const getLatestTemperatures = (): Promise<DataPoints> => {
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

const handleDevRequest = (): Promise<DataPoints> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(new DataPoints(getDummyData()));
    }, 1000);
  });
};
