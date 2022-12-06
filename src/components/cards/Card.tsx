import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import "./Cards.css";

export interface ICardProps {
  title?: string;
  header?: string | null;
  subtitle?: string | null;
  color?: string;
}
export const Card = ({ props }: { props: ICardProps }) => {
  return (
    <IonCard
      color={props.color ? props.color : "primary"}
      style={{ margin: 0 }}
    >
      <IonCardHeader>
        <IonCardTitle>
          {props.title}: <br></br>
          {props.header}
        </IonCardTitle>
        <IonCardSubtitle>{props.subtitle}</IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
};
