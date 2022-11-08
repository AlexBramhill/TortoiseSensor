import { DataPoint } from "../class/DataPoint";
import { ISensorData } from "../hook/useSensorData";

const Graph = ({ sensorData }: { sensorData: ISensorData }) => {
  return (
    <div className="container">{`${
      sensorData.loading ? "Loading" : { sensorData }
    }`}</div>
  );
};

export default Graph;
