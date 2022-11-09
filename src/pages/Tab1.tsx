import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect } from "react";
import { DataPoint } from "../class/DataPoint";
import Graph from "../components/Graph";
import Table from "../components/Table";
import { ISensorData, useSensorData } from "../hook/useSensorData";
import { getAllTemperatures } from "../service/sensorService";
import "./Tab1.css";

const Tab1 = ({ sensorData }: { sensorData: ISensorData }) => {
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
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Table sensorData={sensorData} />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
