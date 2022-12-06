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
      className={"summary-card"}
    >
      <IonCardHeader>
        <IonCardTitle>
          <h2 className="summary-card--heading-title">{props.title}</h2>
          <h2 className="summary-card--heading">{props.header}</h2>
        </IonCardTitle>
        <IonCardSubtitle className="summary-card--subtitle">
          {props.subtitle}
        </IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
};
