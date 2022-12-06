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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Graph Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Graph Page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Graph Page" />
      </IonContent>
    </IonPage>
  );
};

export default GraphPage;
