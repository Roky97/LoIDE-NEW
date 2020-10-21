import { IonButton, IonIcon } from "@ionic/react";
import { play } from "ionicons/icons";
import React from "react";
import { useLoideData } from "../hooks/useLoideData";
import API from "../lib/api";

const LoideRunNavButton: React.FC = () => {
    const dataToRun = useLoideData();

    const onRun = () => {
        API.emitRunProject(dataToRun);
    };

    return (
        <IonButton title="run" color="success" onClick={onRun}>
            <IonIcon icon={play} />
            Run
        </IonButton>
    );
};

export default LoideRunNavButton;
