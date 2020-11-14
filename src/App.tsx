import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
    codeSlashOutline,
    documentTextOutline,
    cog,
    informationCircleOutline,
} from "ionicons/icons";
import MainTab from "./pages/MainTab";
import RunSettingsTab from "./pages/RunSettingsTab";
import OutputTab from "./pages/OutputTab";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.scss";

import "./global.scss";
import AboutTab from "./pages/AboutTab";
import { LanguagesDataStore, OutputStore } from "./lib/store";
import API from "./lib/api";
import { IOutputData } from "./lib/LoideAPIInterfaces";
import { LoidePath } from "./lib/constants";

const App: React.FC = () => {
    useEffect(() => {
        API.createSocket();

        API.setGetLanguagesListener((output) => {
            LanguagesDataStore.update((l) => {
                l.languages = output;
            });
        });

        API.setRunProjectListener((output: IOutputData) => {
            OutputStore.update((o) => {
                o.model = output.model;
                o.error = output.error;
            });
        });

        return () => API.disconnectAndClearSocket();
    }, []);
    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route
                            path={`/${LoidePath.Editor}/:data`}
                            component={MainTab}
                            exact={true}
                        />
                        <Route
                            path={`/${LoidePath.RunSettings}`}
                            component={RunSettingsTab}
                            exact={true}
                        />
                        <Route
                            path={`/${LoidePath.Output}`}
                            component={OutputTab}
                        />
                        <Route
                            path={`/${LoidePath.About}`}
                            component={AboutTab}
                        />
                        <Route
                            path="/"
                            render={() => (
                                <Redirect to={`/${LoidePath.Editor}`} />
                            )}
                            exact={true}
                        />
                        <Route component={MainTab} />
                    </IonRouterOutlet>

                    <IonTabBar slot="bottom">
                        <IonTabButton
                            tab="editor"
                            href={`/${LoidePath.Editor}`}
                        >
                            <IonIcon icon={codeSlashOutline} />
                            <IonLabel>Editor</IonLabel>
                        </IonTabButton>

                        <IonTabButton
                            tab="run-settings"
                            href={`/${LoidePath.RunSettings}`}
                            className="ion-hide-lg-up"
                        >
                            <IonIcon icon={cog} />
                            <IonLabel>Run Settings</IonLabel>
                        </IonTabButton>

                        <IonTabButton
                            tab="output"
                            href={`/${LoidePath.Output}`}
                        >
                            <IonIcon icon={documentTextOutline} />
                            <IonLabel>Output</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="about" href={`/${LoidePath.About}`}>
                            <IonIcon icon={informationCircleOutline} />
                            <IonLabel>About</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
