import React from "react";
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import RunSettings from "../components/RunSettings";
import { LanguagesDataStore } from "../lib/store";

const RunSettingsTab: React.FC = () => {
    const languages = LanguagesDataStore.useState((l) => l.languages);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Run settings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent forceOverscroll={true}>
                <RunSettings languages={languages} />
            </IonContent>
        </IonPage>
    );
};

export default RunSettingsTab;
