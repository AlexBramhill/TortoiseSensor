import {
  IonHeader,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
} from "@ionic/react";

import { EDateFilterType, IFilterDate } from "../../hook/useFilterDate";
import "./Buttons.css";

export const DateToggleButtons = ({ props }: { props: IFilterDate }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonSegment value={props.dateFilterType}>
          {Object.values(EDateFilterType).map((filterType) => {
            return (
              <IonSegmentButton
                key={filterType}
                onClick={() => props.changeDateFilterType(filterType)}
                value={filterType}
                color={
                  filterType === props.dateFilterType ? "primary" : "segment"
                }
              >
                {filterType}
              </IonSegmentButton>
            );
          })}
        </IonSegment>
      </IonToolbar>
    </IonHeader>
  );
};
