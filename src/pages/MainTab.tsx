import React from "react";
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
// import { useIsMobile } from "../hooks/useIsMobile";
import { play } from "ionicons/icons";
import EditorLayout from "../components/EditorLayout";
import { runProject } from "../lib/api";
import { IOutputData } from "../lib/LoideAPIInterfaces";
import { OutputStore } from "../lib/store";
import { useLoideData } from "../hooks/useLoideData";
import logo from "../assets/img/logo_LoIDE.svg";

const MainTab: React.FC = () => {
    // const isMobile = useIsMobile();
    // const [sidebarShow, setSidebarShow] = useState(true);
    // const [openbarShow, setOpenbarShow] = useState(false);

    // useEffect(() => {
    //     if (isMobile) setSidebarShow(false);
    // }, [isMobile]);

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
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        <img
                            style={{ marginTop: "6px" }}
                            height="30px"
                            src={logo}
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
            <IonContent scrollY={false}>
                <EditorLayout />
            </IonContent>
        </IonPage>
    );
};

export default MainTab;
