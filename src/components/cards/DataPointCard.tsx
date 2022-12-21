import { DataPoint } from "../../class/DataPoint";
import {
  EDangerLevelTemp,
  getDangerLevelSpecByDangerLevelTemp,
} from "../../interface/IDangerLevelTemperature";
import { Card, ICardProps } from "./Card";
import "./Cards.css";

export interface IDataPointProps {
  title: string;
  dataPoint: DataPoint | null;
}
export const DataPointCard = ({ props }: { props: IDataPointProps }) => {
  const cardProps: ICardProps = {
    title: props.title,
    header: `${props.dataPoint?.getFormattedTemp() || "Missing"}`,
    subtitle: `on ${props.dataPoint?.getFormattedDate() || "Missing"}`,
    color:
      props.dataPoint?.getDangerLevelSpec().cssColour ||
      getDangerLevelSpecByDangerLevelTemp(EDangerLevelTemp.MISSING).cssColour,
  };
  return <Card props={cardProps} />;
};
