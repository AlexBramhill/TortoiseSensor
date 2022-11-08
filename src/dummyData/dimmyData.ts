import { DataPoint } from "../class/DataPoint";
import { processRawDataPoint } from "../helper/processDataResponseHelper";

export const getDummyData = () => {
  const array = Array.from({ length: 150 }, () =>
    processRawDataPoint([
      Math.floor(Math.random() * 100000),
      Math.floor(Math.random() * 1000).toString(),
    ])
  );

  array.push(processRawDataPoint([1000, null]));
  return array;
};
