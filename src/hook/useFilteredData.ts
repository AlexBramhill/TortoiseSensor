import React, { useEffect } from "react";
import { DataPoints } from "../class/DataPoints";
import { IFilterDate, useFilterDate } from "./useFilterDate";
import { useSensorData } from "./useSensorData";

export interface IUseFilteredData {
  loading: Boolean;
  filteredData: DataPoints;
  filterDate: IFilterDate;
  refreshSensorData: () => void;
}

export const useFilteredData = () => {
  const [loading, setLoading] = React.useState<Boolean>(true);

  const sensorData = useSensorData();
  const filterDate = useFilterDate();
  const [filteredData, setFilteredData] = React.useState<DataPoints>();

  // Initial load
  useEffect(() => {
    setLoading(true);
    sensorData.refreshSensorData();
  }, []);

  // On updating date filter, perform a refresh and update filter
  useEffect(() => {
    if (sensorData.loading === false)
      setFilteredData(filterSensorDataByDateRange(sensorData.dataPoints));
  }, [filterDate.dateFilterType]);

  useEffect(() => {
    if (sensorData.loading === false) {
      setFilteredData(filterSensorDataByDateRange(sensorData.dataPoints));
      setLoading(false);
    }
  }, [sensorData.dataPoints]);

  const filterSensorDataByDateRange = (SensorDataPoints: DataPoints) => {
    return SensorDataPoints.filterByDateRange(filterDate.getFilterDateRange());
  };

  return {
    loading: loading || sensorData.loading,
    filteredData,
    filterDate,
    refreshSensorData: sensorData.refreshSensorData,
  } as IUseFilteredData;
};
