import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import Table, { ITableProps } from "../components/Table";
import { IUseFilteredData } from "../hook/useFilteredData";
import "./Tab3.css";

const Tab3 = ({ props }: { props: IUseFilteredData }) => {
  const { loading, filteredData, filterDate, refreshSensorData } = props;
  const tableProps: ITableProps = {
    dataPoints: filteredData.dataPoints,
    loading: loading,
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Data</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Data</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Table props={tableProps} />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
