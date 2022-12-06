import { Card, ICardProps } from "./Card";
import "./Cards.css";

export interface ITempCard {
  title: string;
  temp: string | null;
}
export const TempCard = ({ props }: { props: ITempCard }) => {
  const cardProps: ICardProps = {
    title: props.title,
    header: `${props.temp}`,
  };
  return <Card props={cardProps} />;
};
