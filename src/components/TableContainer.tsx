import {
  IonCol,
  IonContent,
  IonGrid,
  IonRippleEffect,
  IonRow,
} from "@ionic/react";
import React from "react";
import { DataPoint } from "../class/DataPoint";
import { formatDateTimeReversed } from "../helper/dateHelper";
import Loading from "./Loading";
import "./TableContainer.css";

enum ETableHeader {
  DATE = "Date",
  TEMP = "Temp",
}

interface ITableSorting {
  header: ETableHeader;
  ascending: boolean;
}

export interface ITableContainerProps {
  dataPoints: DataPoint[];
  loading: Boolean;
}
const TableHeader = ({
  header,
  changeSorting,
}: {
  header: ETableHeader;
  changeSorting: (header: ETableHeader) => void;
}) => {
  return (
    <IonCol
      className="ion-activatable ripple-parent"
      onClick={(e) => {
        changeSorting(header);
      }}
    >
      <b>{header}</b>
      <IonRippleEffect></IonRippleEffect>
    </IonCol>
  );
};

const TableRow = ({ dataPoint }: { dataPoint: DataPoint }) => (
  <IonRow className="table-row">
    <IonCol>{`${formatDateTimeReversed(dataPoint.date)}`}</IonCol>
    <IonCol>{`${dataPoint.getFormattedTemp()}`}</IonCol>
  </IonRow>
);

const TableContainer = ({ props }: { props: ITableContainerProps }) => {
  const [sortColumn, setSortColumn] = React.useState<ITableSorting>({
    header: ETableHeader.DATE,
    ascending: false,
  });

  const changeSorting = (clickedHeader: ETableHeader) => {
    if (clickedHeader === sortColumn.header) {
      const newState = { ...sortColumn, ascending: !sortColumn.ascending };
      setSortColumn(newState);
      return;
    }
    const sortedHeader = clickedHeader;
    setSortColumn({ ...sortColumn, header: sortedHeader });
  };

  if (props.loading) {
    return <Loading />;
  }
  return (
    <IonGrid fixed={true}>
      <IonRow className="table-title">
        <TableHeader header={ETableHeader.DATE} changeSorting={changeSorting} />
        <TableHeader header={ETableHeader.TEMP} changeSorting={changeSorting} />
      </IonRow>
      {[...props.dataPoints]
        .sort((a, b) => sortBy(a, b, sortColumn))
        .map((dataPoint: DataPoint) => (
          <TableRow dataPoint={dataPoint} key={dataPoint.date.getTime()} />
        ))}
    </IonGrid>
  );
};

const sortBy = (a: DataPoint, b: DataPoint, sortColumn: ITableSorting) => {
  const shiftA = sortColumn.ascending ? -1 : 1;
  const shiftB = sortColumn.ascending ? 1 : -1;
  switch (sortColumn.header) {
    case ETableHeader.DATE: {
      return a.date < b.date ? shiftA : shiftB;
    }
    case ETableHeader.TEMP: {
      return a.temp === null || b.temp === null || a.temp < b.temp
        ? shiftA
        : shiftB;
      break;
    }
  }
};

export default TableContainer;
