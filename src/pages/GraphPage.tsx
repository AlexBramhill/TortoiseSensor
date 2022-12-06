import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/containers/ExploreContainer";
import "./GraphPage.css";

const GraphPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <ExploreContainer name="Graph Page" />
      </IonContent>
    </IonPage>
  );
};

export default GraphPage;
