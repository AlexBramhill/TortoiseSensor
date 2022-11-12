import React, { useEffect } from "react";
import { addDays } from "../helper/dateHelper";

export interface IDatetimeLimits {
  startDateTime: IDatetime;
  endDateTime: IDatetime;
}

export interface IDatetime {
  datetime: Date;
  updateDatetime: (datetime: Date) => void;
}
export const useDatetimeLimits = (startDate?: Date, endDate?: Date) => {
  const [startDatetime, setStartDatetime] = React.useState<Date>(
    startDate || new Date("2022-10-09T01:05:55.378Z")
  );
  const [endDatetime, setEndDatetime] = React.useState<Date>(
    endDate || new Date()
  );

  const updateStartDatetime = (newDatetime: Date) => {
    setStartDatetime(newDatetime);
    if (endDatetime < newDatetime) {
      setEndDatetime(addDays(newDatetime, +1));
    }
  };

  const updateEndDatetime = (newDatetime: Date) => {
    setEndDatetime(newDatetime);
    if (startDatetime > newDatetime) {
      console.log("hi");
      setStartDatetime(addDays(newDatetime, -1));
    }
  };

  return {
    startDateTime: {
      datetime: startDatetime,
      updateDatetime: updateStartDatetime,
    },
    endDateTime: { datetime: endDatetime, updateDatetime: updateEndDatetime },
  } as IDatetimeLimits;
};
