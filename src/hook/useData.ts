import React, { useEffect } from "react";
import { DataPoint } from "../class/DataPoint";
import { addDays } from "../helper/dateHelper";
import { useSensorData } from "./useSensorData";

export interface IUseData {
  loading: Boolean;
  dataSummary: IDataSummary;
  filteredDataAndSummary: IFilteredDataAndSummary;
  update: IUpdate;
}

export interface IFilteredDataAndSummary {
  filterStartDate: Date;
  filterEndDate: Date;
  lastDataPoint: DataPoint | null;
  maxDataPoint: DataPoint | null;
  minDataPoint: DataPoint | null;
  nullPoints: DataPoint[];
  filteredDataPoints: DataPoint[];
}

export interface IUpdate {
  updateStartDatetime: (date: Date) => void;
  updateEndDatetime: (date: Date) => void;
}

export interface IDataSummary {
  maxDate: Date;
  minDate: Date;
}

export const useData = () => {
  const sensorData = useSensorData();
  const [loading, setLoading] = React.useState<Boolean>(true);
  const [dataSummary, setDataSummary] = React.useState<IDataSummary>({
    maxDate: new Date(),
    minDate: new Date(),
  });
  const [startDatetimeFilter, setStartDatetimeFilter] = React.useState<Date>(
    addDays(new Date(), -1)
  );
  const [endDatetimeFilter, setEndDatetimeFilter] = React.useState<Date>(
    new Date()
  );
  const [filteredDataAndSummary, setFilteredDataAndSummary] =
    React.useState<IFilteredDataAndSummary>({
      filterStartDate: startDatetimeFilter,
      filterEndDate: endDatetimeFilter,
      lastDataPoint: null,
      maxDataPoint: null,
      minDataPoint: null,
      nullPoints: [],
      filteredDataPoints: [],
    });

  useEffect(() => {
    setLoading(true);
    if (sensorData.loading) {
      return;
    }
    refreshDataSummary();
    refreshFilteredDataAndSummary();
    setLoading(false);
  }, [sensorData.sensorData]);

  useEffect(() => {
    setLoading(true);
    if (sensorData.loading) {
      return;
    }
    refreshFilteredDataAndSummary();
    setLoading(false);
  }, [sensorData.sensorData, startDatetimeFilter, endDatetimeFilter]);

  const refreshDataSummary = () => {
    if (sensorData.loading) {
      return;
    }
    const minDateDataPoint = sensorData.sensorData.reduce((a, b) =>
      a.date < b.date ? a : b
    );
    const maxDateDataPoint = sensorData.sensorData.reduce((a, b) =>
      a.date > b.date ? a : b
    );
    const dataSummary = {
      minDate: minDateDataPoint.date,
      maxDate: maxDateDataPoint.date,
    };
    setDataSummary(dataSummary);
  };

  const refreshFilteredDataAndSummary = () => {
    if (sensorData.loading) {
      return;
    }
    const filteredDataPoints = sensorData.sensorData.filter((dataPoint) => {
      return (
        startDatetimeFilter < dataPoint.date &&
        endDatetimeFilter > dataPoint.date
      );
    });
    if (filteredDataPoints.length === 0) {
      return;
    }
    const lastDataPoint = filteredDataPoints.reduce((a, b) =>
      a.date > b.date ? a : b
    );
    const minDataPoint = filteredDataPoints.reduce((a, b) =>
      a.temp === null || b.temp === null || a.temp < b.temp ? a : b
    );
    const maxDataPoint = filteredDataPoints.reduce((a, b) =>
      a.temp === null || b.temp === null || a.temp > b.temp ? a : b
    );
    const nullPoints = filteredDataPoints.filter(
      (dataPoint) => dataPoint.temp === null
    );
    const filteredDataAndSummary = {
      filterStartDate: startDatetimeFilter,
      filterEndDate: endDatetimeFilter,
      lastDataPoint,
      maxDataPoint,
      minDataPoint,
      nullPoints,
      filteredDataPoints,
    };
    setFilteredDataAndSummary(filteredDataAndSummary);
  };

  const updateStartDatetime = (newDatetime: Date) => {
    setStartDatetimeFilter(newDatetime);
    console.log(newDatetime);
    refreshFilteredDataAndSummary();
    if (endDatetimeFilter < newDatetime) {
      const newTime = new Date(
        Math.min(
          addDays(newDatetime, +1).getTime(),
          dataSummary.maxDate.getTime()
        )
      );
      setEndDatetimeFilter(newTime);
    }
  };

  const updateEndDatetime = (newDatetime: Date) => {
    setEndDatetimeFilter(newDatetime);
    refreshFilteredDataAndSummary();
    if (startDatetimeFilter > newDatetime) {
      const newTime = new Date(
        Math.max(
          addDays(newDatetime, -1).getTime(),
          dataSummary.minDate.getTime()
        )
      );
      setStartDatetimeFilter(newTime);
    }
  };

  const update = { updateStartDatetime, updateEndDatetime } as IUpdate;

  return {
    loading,
    dataSummary,
    filteredDataAndSummary,
    update,
  } as IUseData;
};
