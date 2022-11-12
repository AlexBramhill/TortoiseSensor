import { IonButton, IonButtons, IonDatetime, IonModal } from "@ionic/react";
import { useRef, useState } from "react";
import { formatDateTime } from "../../helper/dateHelper";
import "./DatePicker.css";

export interface IDatePickerProps {
  datetime: Date;
  updateDatetime: (date: Date) => void;
  min: Date;
  max: Date;
}
export const DatePicker = ({ props }: { props: IDatePickerProps }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const componentDatetime = useRef<null | HTMLIonDatetimeElement>(null);

  const now = () => {
    const nowDate = new Date();
    componentDatetime.current?.reset(nowDate.toISOString());
    props.updateDatetime(nowDate);
    toggleIsOpen();
  };
  const cancel = () => {
    componentDatetime.current?.cancel();
    toggleIsOpen();
  };
  const confirm = () => {
    componentDatetime.current?.confirm();
    props.updateDatetime(new Date(componentDatetime.current?.value as string));
    toggleIsOpen();
  };

  return (
    <>
      <IonButton onClick={toggleIsOpen}>
        {formatDateTime(props.datetime)}
      </IonButton>

      <IonModal
        isOpen={isOpen}
        backdropDismiss={false}
        keepContentsMounted={true}
        className="date-picker-modal"
      >
        <IonDatetime
          ref={componentDatetime}
          value={props.datetime.toISOString()}
          locale="en-GB"
          min={props.min.toISOString()}
          max={props.max.toISOString()}
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
