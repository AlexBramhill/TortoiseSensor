import { DataPoints } from "../../class/DataPoints";
import { Card, ICardProps } from "./Card";
import "./Cards.css";

export interface INullPointsProps {
  title: string;
  nullPoints: DataPoints | null;
}
export const NullPointsCard = ({ props }: { props: INullPointsProps }) => {
  const cardProps: ICardProps = {
    title: props.title,
    header: `${props.nullPoints?.dataPoints.length}`,
    subtitle: `${props.nullPoints?.getLastDataPoint()?.getFormattedDate()}`,
  };
  return <Card props={cardProps} />;
};
