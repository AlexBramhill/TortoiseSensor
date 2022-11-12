import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import { DatePicker, IDatePickerProps } from "../atoms/DatePicker";

export interface IDataDisplay {
  title: string;
  data: string;
}
export const DataDisplay = ({ props }: { props: IDataDisplay }) => {
  return (
    <IonCard color="primary">
      <IonCardHeader>
        <IonCardTitle>{props.title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{props.data}</IonCardContent>
    </IonCard>
  );
};
