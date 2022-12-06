import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { DateToggleButtons } from "../components/buttons/DateToggleButtons";
import Loading from "../components/Loading";
import TableContainer, {
  ITableContainerProps,
} from "../components/TableContainer";
import { IUseFilteredData } from "../hook/useFilteredData";
import "./TablePage.css";

const TablePage = ({ props }: { props: IUseFilteredData }) => {
  const { loading, filteredData, filterDate } = props;
  const tableProps: ITableContainerProps = {
    dataPoints: filteredData?.dataPoints,
    loading: loading,
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Data</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Data</IonTitle>
          </IonToolbar>
        </IonHeader>
        <DateToggleButtons props={filterDate} />
        <TableContainer props={tableProps} />
      </IonContent>
    </IonPage>
  );
};

export default TablePage;
