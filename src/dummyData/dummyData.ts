import { DataPoint } from "../class/DataPoint";
import { addDays } from "../helper/dateHelper";
import { processRawDataPoint } from "../helper/processDataResponseHelper";

export const getDummyData = () => {
  const dateNow = new Date();
  const dateStart = addDays(dateNow, -10);
  const dateMid = addDays(dateNow, -5);
  const array = Array.from({ length: 150 }, () =>
    processRawDataPoint([
      randomMinMax(dateStart.valueOf() / 1000, dateNow.valueOf() / 1000),
      randomMinMax(-10, 20).toString(),
    ])
  );

  array.push(processRawDataPoint([dateStart.valueOf() / 1000, null]));
  array.push(processRawDataPoint([dateNow.valueOf() / 1000, null]));
  array.push(processRawDataPoint([dateMid.valueOf() / 1000, null]));

  return array;
};

const randomMinMax = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
