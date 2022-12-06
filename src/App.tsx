import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import React from "react";
import { Redirect, Route } from "react-router-dom";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */
import { useFilteredData } from "./hook/useFilteredData";
import SummaryPage from "./pages/SummaryPage";
import GraphPage from "./pages/GraphPage";
import "./theme/variables.css";
import TablePage from "./pages/TablePage";

setupIonicReact();

const App: React.FC = () => {
  const data = useFilteredData();
  const globalProps = data;
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/summary">
              <SummaryPage props={globalProps} />
            </Route>
            <Route exact path="/graph">
              <GraphPage />
            </Route>
            <Route path="/table">
              <TablePage props={globalProps} />
            </Route>
            <Route exact path="/">
              <Redirect to="/summary" />
            </Route>
            <Route>
              <Redirect to="/summary" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/summary">
              <IonIcon icon={triangle} />
              <IonLabel>Summary</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Graph" href="/graph">
              <IonIcon icon={ellipse} />
              <IonLabel>Graph</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Table" href="/table">
              <IonIcon icon={square} />
              <IonLabel>Table</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
