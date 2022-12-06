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
import { DateToggleButtons } from "../components/buttons/DateToggleButtons";
import { DataPointCard } from "../components/cards/DataPointCard";
import { NullPointsCard } from "../components/cards/NullPointsCard";
import { TempCard } from "../components/cards/TempCard";
import Loading from "../components/Loading";
import { IUseFilteredData } from "../hook/useFilteredData";
import "./SummaryPage.css";

const SummaryPage = ({ props }: { props: IUseFilteredData }) => {
  const { loading, filteredData, filterDate, refreshSensorData } = props;
  if (loading) {
    return <Loading />;
  }
  return (
    <IonPage>
      <DateToggleButtons props={filterDate} />
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="6" size-sm="4" size-lg="3" size-xl="2">
              <DataPointCard
                props={{
                  title: "High",
                  dataPoint: filteredData.getMaxDataPoint(),
                }}
              />
            </IonCol>
            <IonCol size="6" size-sm="4" size-lg="3" size-xl="2">
              <DataPointCard
                props={{
                  title: "Low",
                  dataPoint: filteredData.getMinDataPoint(),
                }}
              />
            </IonCol>
            <IonCol size="6" size-sm="4" size-lg="3" size-xl="2">
              <TempCard
                props={{
                  title: "Average",
                  temp: filteredData.getAverageTemp(),
                }}
              />
            </IonCol>
            <IonCol size="6" size-sm="4" size-lg="3" size-xl="2">
              <DataPointCard
                props={{
                  title: "Last Reading",
                  dataPoint: filteredData.getLastDataPoint(),
                }}
              />
            </IonCol>
            {filteredData.getLastDataPoint()?.isMissing() ? (
              <IonCol size="6" size-sm="4" size-lg="3" size-xl="2">
                <DataPointCard
                  props={{
                    title: "Last Successful Reading",
                    dataPoint: filteredData.getLastNonMissingDataPoint(),
                  }}
                />
              </IonCol>
            ) : (
              ""
            )}
            <IonCol size="6" size-sm="4" size-lg="3" size-xl="2">
              <NullPointsCard
                props={{
                  title: "Missed Reading Count",
                  nullPoints: filteredData.getNullPoints(),
                }}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SummaryPage;
