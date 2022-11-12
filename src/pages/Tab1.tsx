import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { DataPointDisplay } from "../components/cards/DataPointDisplay";
import {
  DuelDatePicker,
  IDuelDatePickerProps,
} from "../components/cards/DuelDatePicker";
import Loading from "../components/Loading";
import { IUseData } from "../hook/useData";
import "./Tab1.css";

const Tab1 = ({ props }: { props: IUseData }) => {
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
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Summary</IonTitle>
          </IonToolbar>
        </IonHeader>
        <DuelDatePicker props={duelDatePickerProps} />
        <IonGrid>
          <IonRow>
            <IonCol size="6" size-sm="4" size-lg="3" size-xl="2">
              <DataPointDisplay
                props={{
                  title: "High",
                  dataPoint: props.filteredDataAndSummary.maxDataPoint,
                }}
              />
            </IonCol>
            <IonCol size="6" size-sm="4" size-lg="3" size-xl="2">
              <DataPointDisplay
                props={{
                  title: "Low",
                  dataPoint: props.filteredDataAndSummary.minDataPoint,
                }}
              />
            </IonCol>
            <IonCol size="6" size-sm="4" size-lg="3" size-xl="2">
              <DataPointDisplay
                props={{
                  title: "Av",
                  dataPoint: props.filteredDataAndSummary.lastDataPoint,
                }}
              />
            </IonCol>
            <IonCol size="6" size-sm="4" size-lg="3" size-xl="2">
              <DataPointDisplay
                props={{
                  title: "Last",
                  dataPoint: props.filteredDataAndSummary.lastDataPoint,
                }}
              />
            </IonCol>
            <IonCol size="6" size-sm="4" size-lg="3" size-xl="2">
              <DataPointDisplay
                props={{
                  title: "Miss",
                  dataPoint: props.filteredDataAndSummary.lastDataPoint,
                }}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
