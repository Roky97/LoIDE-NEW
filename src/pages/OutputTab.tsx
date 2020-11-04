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
import {
    backspaceOutline,
    cloudDownloadOutline,
    downloadOutline,
} from "ionicons/icons";

const OutputTab: React.FC = () => {
    const outputModel = OutputStore.useState((o) => o.model);
    const outputError = OutputStore.useState((o) => o.error);

    const clearOutput = () => {
        OutputStore.update((o) => {
            o.model = "";
            o.error = "";
        });
    };

    const downloadOutput = () => {
        let fileContent = `${outputModel} ${
            outputModel.length > 0 ? "\n\n" : ""
        } ${outputError}`;

        const element = document.createElement("a");
        const file = new Blob([fileContent], {
            type: "text/plain",
        });
        element.href = URL.createObjectURL(file);
        element.download = "LoIDE_Output";
        document.body.appendChild(element);
        element.click();
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Output</IonTitle>
                    <IonButtons slot="start">
                        <IonButton
                            color="primary"
                            className="ion-hide-sm-up"
                            disabled={
                                outputModel.length === 0 &&
                                outputError.length === 0
                            }
                            onClick={downloadOutput}
                        >
                            <IonIcon icon={downloadOutline} />
                            <span className="margin-button-left">Download</span>
                        </IonButton>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton
                            color="primary"
                            className="ion-hide-sm-down"
                            disabled={
                                outputModel.length === 0 &&
                                outputError.length === 0
                            }
                            onClick={downloadOutput}
                        >
                            <IonIcon icon={downloadOutline} />
                            <span className="margin-button-left">Download</span>
                        </IonButton>
                        <IonButton
                            size="small"
                            color="medium"
                            disabled={
                                outputModel.length === 0 &&
                                outputError.length === 0
                            }
                            onClick={clearOutput}
                        >
                            <IonIcon icon={backspaceOutline} />
                            <span className="margin-button-left"> Clear </span>
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
