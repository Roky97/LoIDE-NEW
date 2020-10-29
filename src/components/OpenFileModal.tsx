import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonLoading,
    IonModal,
    IonSpinner,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { UIStatusStore } from "../lib/store";
import LoideFileDropzone from "./LoideFileDropzone";

interface OpenFileModalModalProps {
    isOpen: boolean;
    onDismiss: (value: boolean) => void;
}

const OpenFileModal: React.FC<OpenFileModalModalProps> = (props) => {
    const [showModal, setShowModal] = useState(false);

    const loadingFiles = UIStatusStore.useState((u) => u.loadingFiles);

    useEffect(() => {
        setShowModal(props.isOpen);
    }, [props.isOpen]);

    const onFinishLoad = (ok: boolean) => {
        if (ok) setShowModal(false);
    };

    return (
        <IonModal
            isOpen={showModal}
            swipeToClose={true}
            onDidDismiss={() => props.onDismiss(false)}
        >
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Open project or text files</IonTitle>
                    <IonButtons slot="end">
                        <IonButton
                            color="primary"
                            onClick={() => props.onDismiss(false)}
                        >
                            Close
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {loadingFiles && (
                    <div className="loading-files">
                        <IonSpinner style={{ width: "50px", height: "50px" }} />
                    </div>
                )}
                {!loadingFiles && (
                    <LoideFileDropzone onFinishLoad={onFinishLoad} />
                )}
            </IonContent>
        </IonModal>
    );
};

export default OpenFileModal;
