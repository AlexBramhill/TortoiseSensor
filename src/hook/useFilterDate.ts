import React from "react";
import { minusDays, minusSeconds } from "../helper/dateHelper";
import { IDateRange } from "../interface/IDateRange";

export enum EDateFilterType {
  LAST_HOUR = "Last hour",
  LAST_DAY = "Last day",
  LAST_WEEK = "Last week",
  ALL = "All time",
}

const HOUR_IN_SECONDS = 60 * 60;
const DAY_IN_SECONDS = HOUR_IN_SECONDS * 24;
const WEEK_IN_SECONDS = DAY_IN_SECONDS * 7;

export interface IFilterDate {
  dateFilterType: EDateFilterType;
  changeDateFilterType: (newDateRange: EDateFilterType) => void;
  getFilterDateRange: () => IDateRange;
}

export const useFilterDate = () => {
  const [dateFilterType, setDateFilterType] = React.useState<EDateFilterType>(
    EDateFilterType.ALL
  );

  const changeDateFilterType = (newDateRange: EDateFilterType) => {
    setDateFilterType(newDateRange);
  };

  const getFilterDateRange = () => {
    const now = new Date();
    switch (dateFilterType) {
      case EDateFilterType.LAST_HOUR:
        return {
          minDate: minusSeconds(now, HOUR_IN_SECONDS),
          maxDate: now,
        } as IDateRange;
      case EDateFilterType.LAST_DAY:
        return {
          minDate: minusSeconds(now, DAY_IN_SECONDS),
          maxDate: now,
        } as IDateRange;
      case EDateFilterType.LAST_WEEK:
        return {
          minDate: minusSeconds(now, WEEK_IN_SECONDS),
          maxDate: now,
        } as IDateRange;
      default:
        return {} as IDateRange;
    }
  };

  return {
    dateFilterType,
    changeDateFilterType,
    getFilterDateRange,
  } as IFilterDate;
};
