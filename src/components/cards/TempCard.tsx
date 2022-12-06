import { Card, ICardProps } from "./Card";
import "./Cards.css";

export interface ITempCard {
  title: string;
  temp: string | null;
  tempAcceptance: string;
}
export const TempCard = ({ props }: { props: ITempCard }) => {
  const cardProps: ICardProps = {
    title: props.title,
    header: props.temp,
    color: props.tempAcceptance,
  };
  return <Card props={cardProps} />;
};
