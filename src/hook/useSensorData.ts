import React, { useEffect } from "react";
import { DataPoints } from "../class/DataPoints";
import { IDateRange } from "../interface/IDateRange";
import { getAllTemperatures } from "../service/sensorService";

export interface ISensorData {
  dataPoints: DataPoints;
  sensorDateRange: IDateRange;
  loading: Boolean;
  refreshSensorData: () => Promise<void>;
}
export const useSensorData = (): ISensorData => {
  const [sensorData, setSensorData] = React.useState<DataPoints>();
  const [loading, setLoading] = React.useState<Boolean>(true);

  useEffect(() => {
    refreshSensorData();
  }, []);

  const refreshSensorData = async () => {
    setLoading(true);
    getAllTemperatures().then((response) => {
      setSensorData(response);
      setLoading(false);
    });
  };

  return {
    dataPoints: sensorData,
    loading,
    refreshSensorData,
  } as ISensorData;
};
