import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { DateToggleButtons } from "../components/buttons/DateToggleButtons";
import { ILineGraphProps, LineGraph } from "../components/chart/LineGraph";
import Loading from "../components/Loading";
import { IUseFilteredData } from "../hook/useFilteredData";
import "./GraphPage.css";

const GraphPage = ({ props }: { props: IUseFilteredData }) => {
  const { loading, filteredData, filterDate, refreshSensorData } = props;
  if (loading) {
    return <Loading />;
  }
  return (
    <IonPage>
      <DateToggleButtons props={filterDate} />
      <IonContent fullscreen>
        <LineGraph props={{ data: filteredData }}></LineGraph>
      </IonContent>
    </IonPage>
  );
};

export default GraphPage;
