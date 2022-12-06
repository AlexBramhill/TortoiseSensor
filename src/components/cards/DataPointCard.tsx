import { DataPoint } from "../../class/DataPoint";
import { Card, ICardProps } from "./Card";
import "./Cards.css";

export interface IDataPointProps {
  title: string;
  dataPoint: DataPoint | null;
}
export const DataPointCard = ({ props }: { props: IDataPointProps }) => {
  const cardProps: ICardProps = {
    title: props.title,
    header: `${props.dataPoint?.getFormattedTemp()}`,
    subtitle: `on ${props.dataPoint?.getFormattedDate()}`,
    color: props.dataPoint?.getDangerLevel()
  };
  return <Card props={cardProps} />;
};
