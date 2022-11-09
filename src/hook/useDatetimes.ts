import React from "react";

export interface IDateTimeLimits {
  startDateTime: IDateTimeLimit;
  endDateTime: IDateTimeLimit;
}

export interface IDateTimeLimit {
  dateTime: Date;
  setDateTime: React.Dispatch<React.SetStateAction<Date>>;
}
export const useDatetimes = (startDate?: Date, endDate?: Date) => {
  const [startDateTime, setStartDateTime] = React.useState<Date>(
    startDate || new Date("2022-10-09T01:05:55.378Z")
  );
  const [endDateTime, setEndDateTime] = React.useState<Date>(
    endDate || new Date()
  );

  return {
    startDateTime: {
      dateTime: startDateTime,
      setDateTime: setStartDateTime,
    },
    endDateTime: { dateTime: endDateTime, setDateTime: setEndDateTime },
  } as IDateTimeLimits;
};
