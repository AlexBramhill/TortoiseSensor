import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonText,
} from "@ionic/react";
import { DataPoint } from "../../class/DataPoint";
import "./Cards.css";

export interface IDataPointDisplay {
  title: string;
  dataPoint: DataPoint | null;
}
export const DataPointDisplay = ({ props }: { props: IDataPointDisplay }) => {
  return (
    <IonCard color="light" style={{ margin: 0 }}>
      <IonCardHeader>
        <IonCardTitle>
          {props.title}: <br></br>
          {props.dataPoint?.temp}°C
        </IonCardTitle>
        <IonCardSubtitle>
          on {props.dataPoint?.getFormattedDate()}
        </IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
};
