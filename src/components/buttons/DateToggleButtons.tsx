import React from "react";
import { IonButton, IonButtons, IonTitle, IonToolbar } from "@ionic/react";

import "./Buttons.css";
import { EDateFilterType, IFilterDate } from "../../hook/useFilterDate";

export const DateToggleButtons = ({ props }: { props: IFilterDate }) => {
  return (
    <IonToolbar>
      <IonButtons>
        {Object.values(EDateFilterType).map((filterType) => {
          return (
            <IonButton
              size="small"
              key={filterType}
              fill={filterType === props.dateFilterType ? "solid" : "outline"}
              onClick={() => props.changeDateFilterType(filterType)}
            >
              {filterType}
            </IonButton>
          );
        })}
      </IonButtons>
    </IonToolbar>
  );
};
