import React, { useState } from "react";
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonMenu,
    IonPage,
    IonSplitPane,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import logo from "../assets/img/logo_LoIDE.svg";
import RunSettings from "../components/RunSettings";
import LoideRunNavButton from "../components/LoideRunNavButton";
import Editor from "../components/Editor";
import OpenFileModal from "../components/OpenFileModal";
import { folderOpenOutline } from "ionicons/icons";

const MainTab: React.FC = () => {
    const [showOpenModal, setShowOpenModal] = useState(false);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        <img
                            className="logo"
                            style={{ marginTop: "6px" }}
                            height="30px"
                            src={logo}
                            alt="loide-logo"
                        />
                    </IonTitle>
                    <IonButtons slot="start">
                        <LoideRunNavButton />
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton
                            title="Open"
                            color="warning"
                            onClick={() => setShowOpenModal(true)}
                        >
                            <IonIcon icon={folderOpenOutline} />
                            <span className="margin-button-left">Open</span>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false} className="tab-content-of-hidden">
                <IonSplitPane contentId="main" when="lg">
                    {/*--  the side menu  --*/}
                    <IonMenu contentId="main">
                        <IonHeader>
                            <IonToolbar className="side-toolbar">
                                <IonTitle>Run settings</IonTitle>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent forceOverscroll={true}>
                            <RunSettings />
                        </IonContent>
                    </IonMenu>

                    {/*-- the main content --*/}
                    <div id="main" className="main-side-editor">
                        <Editor />
                    </div>
                </IonSplitPane>
                <OpenFileModal
                    isOpen={showOpenModal}
                    onDismiss={setShowOpenModal}
                />
            </IonContent>
        </IonPage>
    );
};

export default MainTab;
