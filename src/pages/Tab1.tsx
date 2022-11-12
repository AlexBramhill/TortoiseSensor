import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar
} from "@ionic/react";
import { DataDisplay } from "../components/cards/DataPointDisplay";
import {
  DuelDatePicker,
  IDuelDatePickerProps
} from "../components/cards/DuelDatePicker";
import Loading from "../components/Loading";
import { IUseData } from "../hook/useData";
import "./Tab1.css";

const Tab1 = ({ props }: { props: IUseData }) => {
  const { loading, dataSummary, filteredDataAndSummary, update } = props;

  const duelDatePickerProps: IDuelDatePickerProps = {
    title: "Dates",
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
  if (loading) {
    return <Loading />;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Summary</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <DuelDatePicker props={duelDatePickerProps} />
        <DataDisplay
          props={{
            title: "Average Temp",
            dataPoint: props.filteredDataAndSummary.lastDataPoint,
          }}
        />
        <DataDisplay
          props={{
            title: "Last Reading",
            dataPoint: props.filteredDataAndSummary.lastDataPoint,
          }}
        />
        <DataDisplay
          props={{
            title: "Missed Reading",
            dataPoint: props.filteredDataAndSummary.lastDataPoint,
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
