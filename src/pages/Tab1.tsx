import { IonDatetimeCustomEvent } from "@ionic/core";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonButton,
  IonButtons,
  DatetimeChangeEventDetail,
} from "@ionic/react";
import { FormEvent, MouseEvent, useRef, useState } from "react";
import { IGlobalProps } from "../App";
import { DataDisplay } from "../components/cards/DataDisplay";
import {
  DuelDatePicker,
  IDuelDatePickerProps,
} from "../components/cards/DuelDatePicker";
import { useDatetimeLimits } from "../hook/useDatetimes";
import { ISensorData } from "../hook/useSensorData";
import "./Tab2.css";

const Tab1 = ({ globalProps }: { globalProps: IGlobalProps }) => {
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
          <IonTitle>Summary</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <DuelDatePicker props={DuelDatePickerProps} />
        <DataDisplay props={{ title: "Test", data: "15deg" }} />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
