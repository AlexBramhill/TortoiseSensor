import React, { useEffect } from "react";
import { DataPoint } from "../class/DataPoint";
import { getAllTemperatures } from "../service/sensorService";

export interface ISensorData {
  sensorData: DataPoint[];
  loading: Boolean;
  refreshSensorData: () => Promise<void>;
}
export const useSensorData = () => {
  const [sensorData, setSensorData] = React.useState<DataPoint[]>([]);
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

  return { sensorData, loading, refreshSensorData } as ISensorData;
};
