import React from "react";
import {
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import Output from "../components/Output";
import { OutputStore } from "../lib/store";
import { backspaceOutline } from "ionicons/icons";

const OutputTab: React.FC = () => {
    const outputModel = OutputStore.useState((o) => o.model);
    const outputError = OutputStore.useState((o) => o.error);

    const clearOutput = () => {
        OutputStore.update((o) => {
            o.model = "";
            o.error = "";
        });
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Output</IonTitle>
                    <IonButtons slot="end">
                        <IonButton
                            size="small"
                            disabled={
                                outputModel.length === 0 &&
                                outputError.length === 0
                            }
                            onClick={clearOutput}
                        >
                            <IonIcon icon={backspaceOutline} />
                            Clear
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false} className="tab-content-of-hidden">
                <IonRow style={{ height: "100%" }}>
                    <IonCol
                        size-md="8"
                        offset-md="2"
                        size-xl="6"
                        offset-xl="3"
                        className="ion-no-padding"
                        style={{ height: "100%" }}
                    >
                        <Output model={outputModel} error={outputError} />
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    );
};

export default OutputTab;
