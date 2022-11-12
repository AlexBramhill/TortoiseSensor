import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import { DatePicker, IDatePickerProps } from "../atoms/DatePicker";

export interface IDuelDatePickerProps {
  title: string;
  datePicker1Props: IDatePickerProps;
  datePicker2Props: IDatePickerProps;
}
export const DuelDatePicker = ({ props }: { props: IDuelDatePickerProps }) => {
  return (
    <IonCard color="primary">
      <IonCardHeader>
        <IonCardTitle>{props.title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <DatePicker props={props.datePicker1Props} key="1" />
        <DatePicker props={props.datePicker2Props} key="2" />
      </IonCardContent>
    </IonCard>
  );
};
