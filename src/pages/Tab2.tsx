import { IonDatetimeCustomEvent } from "@ionic/core";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonButton,
  IonButtons,
  DatetimeChangeEventDetail,
} from "@ionic/react";
import { FormEvent, MouseEvent, useRef, useState } from "react";
import Table from "../components/Table";
import { formatDateTime } from "../helper/dateHelper";
import { IDateTimeLimit, useDatetimes } from "../hook/useDatetimes";
import { ISensorData } from "../hook/useSensorData";
import "./Tab2.css";

const DatePicker = ({ data, name }: { data: IDateTimeLimit; name: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const datetime = useRef<HTMLIonDatetimeElement>({} as HTMLIonDatetimeElement);

  const now = () => {
    const nowDate = new Date();
    datetime.current?.reset(nowDate.toISOString());
    data.setDateTime(nowDate);
    toggleIsOpen();
  };
  const cancel = () => {
    datetime.current?.cancel();
    toggleIsOpen();
  };
  const confirm = () => {
    datetime.current?.confirm();
    data.setDateTime(new Date(datetime.current?.value as string));
    toggleIsOpen();
  };
  return (
    <>
      <IonButton onClick={toggleIsOpen}>
        {formatDateTime(data.dateTime)}
      </IonButton>

      <IonModal
        isOpen={isOpen}
        backdropDismiss={false}
        keepContentsMounted={true}
        className="date-picker-modal"
      >
        <IonDatetime
          ref={datetime}
          value={data.dateTime.toISOString()}
          locale="en-GB"
          min="2022-03-01T00:00:00"
          max="2022-12-31T23:59:59"
        >
          <IonButtons slot="buttons">
            <IonButton color="danger" onClick={cancel}>
              Cancel
            </IonButton>
            <IonButton color="primary" onClick={now}>
              Now
            </IonButton>
            <IonButton color="primary" onClick={confirm}>
              Done
            </IonButton>
          </IonButtons>
        </IonDatetime>
      </IonModal>
    </>
  );
};
const Tab2 = ({ sensorData }: { sensorData: ISensorData }) => {
  const dateTimes = useDatetimes();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Summary</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard color="primary">
          <IonCardHeader>
            <IonCardTitle>Currently Showing</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <DatePicker data={dateTimes.startDateTime} name="Start" key="1" />
            <DatePicker data={dateTimes.endDateTime} name="End" key="2" />
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
