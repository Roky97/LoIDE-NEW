import React from "react";
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
// import { useIsMobile } from "../hooks/useIsMobile";
import { play } from "ionicons/icons";
import EditorLayout from "../components/EditorLayout";
import { runProject } from "../lib/api";
import { IOutputData } from "../lib/LoideAPIInterfaces";
import { LanguagesDataStore, OutputStore } from "../lib/store";
import { useLoideData } from "../hooks/useLoideData";
import logo from "../assets/img/logo_LoIDE.svg";
import RunSettings from "../components/RunSettings";

const MainTab: React.FC = () => {
    // const isMobile = useIsMobile();
    // const [sidebarShow, setSidebarShow] = useState(true);
    // const [openbarShow, setOpenbarShow] = useState(false);

    // useEffect(() => {
    //     if (isMobile) setSidebarShow(false);
    // }, [isMobile]);

    const dataToRun = useLoideData();
    const languages = LanguagesDataStore.useState((l) => l.languages);

    const onRun = () => {
        runProject(dataToRun, (output: IOutputData) => {
            OutputStore.update((o) => {
                o.model = output.model;
                o.error = output.error;
            });
        });
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
                        <IonButton color="success" onClick={onRun}>
                            <IonIcon icon={play} />
                            Run
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false} className="tab-content-of-hidden">
                <IonSplitPane contentId="main" when="lg">
                    {/*--  the side menu  --*/}
                    <IonMenu contentId="main">
                        <IonHeader>
                            <IonToolbar>
                                <IonTitle>Run settings</IonTitle>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent forceOverscroll={true}>
                            <RunSettings languages={languages} />
                        </IonContent>
                    </IonMenu>

                    {/*-- the main content --*/}
                    <div id="main" className="main-side-editor">
                        <EditorLayout />
                    </div>
                </IonSplitPane>
            </IonContent>
        </IonPage>
    );
};

export default MainTab;
