import {
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonRippleEffect,
  IonRow,
} from "@ionic/react";
import { chevronDown } from "ionicons/icons";
import React from "react";
import { DataPoint } from "../class/DataPoint";
import { formatDateTimeReversed } from "../helper/dateHelper";
import { ISensorData } from "../hook/useSensorData";
import Loading from "./Loading";
import "./Table.css";

enum ETableHeader {
  DATE = "Date",
  TEMP = "Temp",
}

interface ITableSorting {
  header: ETableHeader;
  ascending: boolean;
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
    <IonCol> {`${formatDateTimeReversed(dataPoint.date)}`}</IonCol>
    <IonCol>{`${dataPoint.temp}`}</IonCol>
  </IonRow>
);

const Table = ({ sensorData }: { sensorData: ISensorData }) => {
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

  if (sensorData.loading) {
    return <Loading />;
  }
  return (
    <IonContent>
      <IonGrid fixed={true}>
        <IonRow className="table-title">
          <TableHeader
            header={ETableHeader.DATE}
            changeSorting={changeSorting}
          />
          <TableHeader
            header={ETableHeader.TEMP}
            changeSorting={changeSorting}
          />
        </IonRow>
        {[...sensorData.sensorData]
          .sort((a, b) => sortBy(a, b, sortColumn))
          .map((dataPoint: DataPoint) => (
            <TableRow dataPoint={dataPoint} />
          ))}
      </IonGrid>
    </IonContent>
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

export default Table;
