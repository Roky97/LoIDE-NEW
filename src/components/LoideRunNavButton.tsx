import { IonButton, IonIcon } from "@ionic/react";
import { play } from "ionicons/icons";
import React from "react";
import { useLoideData } from "../hooks/useLoideData";
import { runProject } from "../lib/api";
import { IOutputData } from "../lib/LoideAPIInterfaces";
import { OutputStore } from "../lib/store";

const LoideRunNavButton: React.FC = () => {
    const dataToRun = useLoideData();

    const onRun = () => {
        runProject(dataToRun, (output: IOutputData) => {
            OutputStore.update((o) => {
                o.model = output.model;
                o.error = output.error;
            });
        });
    };

    return (
        <IonButton color="success" onClick={onRun}>
            <IonIcon icon={play} />
            Run
        </IonButton>
    );
};

export default LoideRunNavButton;
