import React, { useState } from "react";
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonPage,
    IonPopover,
    IonSplitPane,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { alertController } from "@ionic/core";
import logo from "../assets/img/logo_LoIDE.svg";
import RunSettings from "../components/RunSettings";
import LoideRunNavButton from "../components/LoideRunNavButton";
import Editor from "../components/Editor";
import OpenProjectModal from "../components/OpenProjectModal";
import {
    closeCircleOutline,
    ellipsisVerticalOutline,
    folderOpenOutline,
    saveOutline,
} from "ionicons/icons";
import SaveProjectModal from "../components/SaveProjectModal";
import { InitalTabCountID, WindowConfirmMessages } from "../lib/constants";
import { EditorStore } from "../lib/store";
import { ILoideTab } from "../lib/LoideInterfaces";

const MainTab: React.FC = () => {
    const [showOpenModal, setShowOpenModal] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [buttonsPopover, setButtonsPopover] = useState<{
        open: boolean;
        event: Event | undefined;
    }>({ open: false, event: undefined });

    const eraseTabs = () => {
        let nextTabs = new Map<number, ILoideTab>().set(InitalTabCountID, {
            title: `L P ${InitalTabCountID}`,
            type: "",
            value: "",
        });
        EditorStore.update((e) => {
            e.tabs = nextTabs;
            e.currentTab = 0;
            e.tabCountID = InitalTabCountID;
        });
    };

    const showResetAlert = () => {
        alertController
            .create({
                message: WindowConfirmMessages.ResetInput.message,
                header: WindowConfirmMessages.ResetInput.header,
                buttons: [
                    { text: "Cancel" },
                    {
                        text: "Reset",
                        handler: () => eraseTabs(),
                    },
                ],
            })
            .then((alert) => alert.present());
    };

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
                            className="ion-hide-sm-down"
                            onClick={() => setShowOpenModal(true)}
                        >
                            <IonIcon icon={folderOpenOutline} />
                            <span className="margin-button-left">Open</span>
                        </IonButton>
                        <IonButton
                            title="Save"
                            color="primary"
                            className="ion-hide-sm-down"
                            onClick={() => setShowSaveModal(true)}
                        >
                            <IonIcon icon={saveOutline} />
                            <span className="margin-button-left">Save</span>
                        </IonButton>
                        <IonButton
                            color="primary"
                            className="ion-hide-sm-up"
                            title="Operations"
                            onClick={(e) =>
                                setButtonsPopover({
                                    open: true,
                                    event: e.nativeEvent,
                                })
                            }
                        >
                            <IonIcon icon={ellipsisVerticalOutline} />
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
                <OpenProjectModal
                    isOpen={showOpenModal}
                    onDismiss={setShowOpenModal}
                />
                <SaveProjectModal
                    isOpen={showSaveModal}
                    onDismiss={setShowSaveModal}
                />
                <IonPopover
                    data-testid="operations-popover"
                    isOpen={buttonsPopover.open}
                    event={buttonsPopover.event}
                    onDidDismiss={(e) =>
                        setButtonsPopover({ open: false, event: undefined })
                    }
                >
                    <IonList>
                        <IonItem
                            button={true}
                            onClick={() => setShowOpenModal(true)}
                            title="Open"
                        >
                            <IonLabel>Open</IonLabel>
                            <IonIcon
                                color="warning"
                                icon={folderOpenOutline}
                                slot="end"
                            />
                        </IonItem>
                        <IonItem
                            button={true}
                            onClick={() => setShowSaveModal(true)}
                            title="Save"
                        >
                            <IonLabel>Save</IonLabel>
                            <IonIcon
                                color="primary"
                                icon={saveOutline}
                                slot="end"
                            />
                        </IonItem>
                        <IonItem
                            button={true}
                            title="Reset input"
                            onClick={() => showResetAlert()}
                        >
                            <IonLabel>Reset input</IonLabel>
                            <IonIcon
                                color="danger"
                                icon={closeCircleOutline}
                                slot="end"
                            />
                        </IonItem>
                    </IonList>
                </IonPopover>
            </IonContent>
        </IonPage>
    );
};

export default MainTab;
