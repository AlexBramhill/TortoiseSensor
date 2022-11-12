import {
    IonCard, IonCardContent, IonCardHeader,
    IonCardTitle, IonText
} from "@ionic/react";
import { DataPoint } from "../../class/DataPoint";

export interface IDataPointDisplay {
  title: string;
  dataPoint: DataPoint | null;
}
export const DataDisplay = ({ props }: { props: IDataPointDisplay }) => {
  return (
    <IonCard color="primary">
      <IonCardHeader>
        <IonCardTitle>{props.title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonText>
          <p>Date: {props.dataPoint?.getFormattedDate()}</p>
          <p>Temp: {props.dataPoint?.temp}</p>
        </IonText>
      </IonCardContent>
    </IonCard>
  );
};
