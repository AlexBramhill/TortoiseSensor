import React from "react";
import { minusDays } from "../helper/dateHelper";
import { IDateRange } from "../interface/IDateRange";

export enum EDateFilterType {
  LAST_HOUR = "Last hour",
  LAST_DAY = "Last day",
  LAST_WEEK = "Last week",
}

export interface IFilterDate {
  dateFilterType: EDateFilterType;
  changeDateFilterType: (newDateRange: EDateFilterType) => void;
  getFilterDateRange: () => IDateRange;
}

export const useFilterDate = () => {
  const [dateFilterType, setDateFilterType] = React.useState<EDateFilterType>(
    EDateFilterType.LAST_WEEK
  );

  const changeDateFilterType = (newDateRange: EDateFilterType) => {
    setDateFilterType(newDateRange);
  };

  const getFilterDateRange = () => {
    const now = new Date();
    switch (dateFilterType) {
      case EDateFilterType.LAST_HOUR:
        return { minDate: minusDays(now, 1), maxDate: now } as IDateRange;
      case EDateFilterType.LAST_DAY:
        return { minDate: minusDays(now, 1), maxDate: now } as IDateRange;
      // default inc 1 week
      default:
        return {
          minDate: minusDays(now, 7),
          maxDate: now,
        } as IDateRange;
    }
  };

  return {
    dateFilterType,
    changeDateFilterType,
    getFilterDateRange,
  } as IFilterDate;
};
