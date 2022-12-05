import { DataPoint } from "../../class/DataPoint";
import { getLastDataPoint } from "../../helper/dataHelper";
import { Card, ICardProps } from "./Card";
import "./Cards.css";

export interface INullPointsProps {
  title: string;
  nullPoints: DataPoint[] | null;
}
export const NullPointsCard = ({ props }: { props: INullPointsProps }) => {
  console.log(props.nullPoints);
  const cardProps: ICardProps = {
    title: props.title,
    header: `${props.nullPoints?.length}`,
    subtitle: `${
      !props.nullPoints || props.nullPoints.length
        ? "last: " + getLastDataPoint(props.nullPoints)?.getFormattedDate()
        : ""
    }`,
  };
  return <Card props={cardProps} />;
};
