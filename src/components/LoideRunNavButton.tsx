import { IonButton, IonIcon } from "@ionic/react";
import { play } from "ionicons/icons";
import React from "react";
import { useLanguageAvailable } from "../hooks/useLanguageAvailable";
import { useLoideData } from "../hooks/useLoideData";
import API from "../lib/api";

const LoideRunNavButton: React.FC = () => {
    const dataToRun = useLoideData();
    const languageAvailable = useLanguageAvailable();

    const onRun = () => {
        API.emitRunProject(dataToRun);
    };

    return (
        <IonButton
            disabled={!languageAvailable}
            title="run"
            color="success"
            onClick={onRun}
        >
            <IonIcon icon={play} />
            <span className="margin-button-left">Run</span>
        </IonButton>
    );
};

export default LoideRunNavButton;
