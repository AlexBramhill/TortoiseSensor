import { Chart, registerables } from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
import { DataPoints } from "../../class/DataPoints";
import { formatDateTimeReversed } from "../../helper/dateHelper";

Chart.register(...registerables);

export interface ILineGraphProps {
  data: DataPoints;
}

export const LineGraph = ({ props }: { props: ILineGraphProps }) => {
  const dataPoints = props.data.getNonNullPoints()?.dataPoints;
  if (!dataPoints) {
    return <></>;
  }
  const formattedData = {
    labels: dataPoints.map((datapoint) =>
      formatDateTimeReversed(datapoint.date)
    ),
    datasets: [
      {
        label: "Temp",
        fill: false,
        lineTension: 0.25,
        data: dataPoints.map((datapoint) => datapoint.temp),
      },
      {
        label: "1°C",
        fill: false,
        lineTension: 0.25,
        data: getDataToDisplayStraightLine(dataPoints.length, 1),
      },
      {
        label: "3°C",
        fill: false,
        lineTension: 0.25,
        data: getDataToDisplayStraightLine(dataPoints.length, 3),
      },
      {
        label: "7°C",
        fill: false,
        lineTension: 0.25,
        data: getDataToDisplayStraightLine(dataPoints.length, 7),
      },
      {
        label: "9°C",
        fill: false,
        lineTension: 0.25,
        data: getDataToDisplayStraightLine(dataPoints.length, 9),
      },
    ],
  };
  return <Line data={formattedData} />;
};

const getDataToDisplayStraightLine = (
  length: number,
  temperature: number
): number[] => {
  return new Array(length).fill(temperature);
};

const lineFormat = {};
