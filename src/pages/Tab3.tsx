import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  DuelDatePicker,
  IDuelDatePickerProps,
} from "../components/cards/DuelDatePicker";
import Table, { ITableProps } from "../components/Table";
import { IUseData } from "../hook/useData";
import "./Tab3.css";

const Tab3 = ({ props }: { props: IUseData }) => {
  const { loading, dataSummary, filteredDataAndSummary, update } = props;
  const duelDatePickerProps: IDuelDatePickerProps = {
    title: "Date Range",
    datePicker1Props: {
      datetime: filteredDataAndSummary.filterStartDate,
      updateDatetime: update.updateStartDatetime,
      min: dataSummary.minDate,
      max: dataSummary.maxDate,
    },
    datePicker2Props: {
      datetime: filteredDataAndSummary.filterEndDate,
      updateDatetime: update.updateEndDatetime,
      min: dataSummary.minDate,
      max: dataSummary.maxDate,
    },
  };
  const tableProps: ITableProps = {
    dataPoints: filteredDataAndSummary.filteredDataPoints,
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
        <DuelDatePicker props={duelDatePickerProps} />
        <Table props={tableProps} />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
