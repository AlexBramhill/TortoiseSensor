import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect } from "react";
import { IGlobalProps } from "../App";
import { DataPoint } from "../class/DataPoint";
import {
  DuelDatePicker,
  IDuelDatePickerProps,
} from "../components/cards/DuelDatePicker";
import Graph from "../components/Graph";
import Table from "../components/Table";
import { ISensorData, useSensorData } from "../hook/useSensorData";
import { getAllTemperatures } from "../service/sensorService";
import "./Tab1.css";

const Tab3 = ({ globalProps }: { globalProps: IGlobalProps }) => {
  const { sensorData, datetimeLimits } = globalProps;
  const DuelDatePickerProps: IDuelDatePickerProps = {
    title: "Dates",
    datePicker1Props: {
      datetime: datetimeLimits.startDateTime,
      min: new Date("2022-01-31T23:59:59"),
      max: new Date("2022-12-31T23:59:59"),
    },
    datePicker2Props: {
      datetime: datetimeLimits.endDateTime,
      min: new Date("2022-01-31T23:59:59"),
      max: new Date("2022-12-31T23:59:59"),
    },
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>All Data</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <DuelDatePicker props={DuelDatePickerProps} />
        <Table sensorData={sensorData} />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
