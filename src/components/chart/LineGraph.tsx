import { Chart, registerables } from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
import { DataPoints } from "../../class/DataPoints";
import { formatDateTimeReversed } from "../../helper/dateHelper";
import ErrorMsg from "../ErrorMsg";

Chart.register(...registerables);

const getDataToDisplayStraightLine = (
  length: number,
  temperature: number
): number[] => {
  return new Array(length).fill(temperature);
};

const lineFormatShared = {
  pointRadius: 0,
};
const lineFormatWarning = {
  borderDash: [10, 10],
  borderColor: "rgb(255,196,9)",
  backgroundColor: "rgba(255,196,9, 0.25)",
  ...lineFormatShared,
};
const lineFormatDanger = {
  borderDash: [10, 5],
  borderColor: "rgb(235,68,90)",
  backgroundColor: "rgba(235,68,90, 0.25)",
  ...lineFormatShared,
};

export interface ILineGraphProps {
  data: DataPoints;
}

export const LineGraph = ({ props }: { props: ILineGraphProps }) => {
  const dataPoints = props.data.getNonNullPoints()?.dataPoints;
  if (!dataPoints || dataPoints.length === 0) {
    return <ErrorMsg>There is no available data</ErrorMsg>;
  }
  if (dataPoints.length === 1) {
    return (
      <ErrorMsg>
        There is only one datapoint - so no graph can be displayed
      </ErrorMsg>
    );
  }

  const minValue = props.data.getMinDataPoint()?.temp;
  const maxValue = props.data.getMaxDataPoint()?.temp;
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        min: minValue ? (minValue < 0 ? minValue - 1 : 0) : 0,
        max: maxValue ? (maxValue > 10 ? maxValue + 1 : 10) : 10,
        stepSize: 5,
      },
      x: {},
    },
  };

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
        borderColor: "rgb(53, 162, 235)",
      },
      {
        label: "1°C",
        fill: { value: -100 },
        data: getDataToDisplayStraightLine(dataPoints.length, 1),
        ...lineFormatDanger,
      },
      {
        label: "3°C",
        fill: 1,
        data: getDataToDisplayStraightLine(dataPoints.length, 3),
        ...lineFormatWarning,
      },
      {
        label: "7°C",
        fill: 4,
        data: getDataToDisplayStraightLine(dataPoints.length, 7),
        ...lineFormatWarning,
      },
      {
        label: "9°C",
        fill: { value: 100 },
        data: getDataToDisplayStraightLine(dataPoints.length, 9),
        ...lineFormatDanger,
      },
    ],
  };
  return <Line data={formattedData} options={options} />;
};
