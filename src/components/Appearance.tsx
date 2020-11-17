import {
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonRange,
    IonToggle,
} from "@ionic/react";
import { moonOutline } from "ionicons/icons";
import React from "react";
import { UIStatusStore } from "../lib/store";
import Utils from "../lib/utils";

interface AppearanceProps {}

const Appearance: React.FC<AppearanceProps> = (props) => {
    const darkMode = UIStatusStore.useState((u) => u.darkMode);
    const fontSizeEditor = UIStatusStore.useState((u) => u.fontSizeEditor);
    const fontSizeOutput = UIStatusStore.useState((u) => u.fontSizeOutput);

    const onDarkModeChange = () => {
        UIStatusStore.update((u) => {
            u.darkMode = !darkMode;
        });
    };

    const onFontEditorChange = (e: any) => {
        let value = e?.detail?.value;
        if (value) {
            UIStatusStore.update((u) => {
                u.fontSizeEditor = value;
            });
        }
    };

    const onFontOutputChange = (e: any) => {
        let value = e?.detail?.value;

        if (value) {
            UIStatusStore.update((u) => {
                u.fontSizeOutput = value;
            });
        }
    };
    return (
        <>
            <IonList>
                <IonListHeader>General</IonListHeader>
                <IonItem>
                    <IonIcon slot="start" color="dark" icon={moonOutline} />
                    <IonLabel>Dark mode </IonLabel>
                    <IonToggle
                        title="Toogle dark mode"
                        checked={darkMode}
                        slot="end"
                        onIonChange={onDarkModeChange}
                    />
                </IonItem>
                <IonListHeader>Editor</IonListHeader>
                <IonItem>
                    <IonRange
                        value={fontSizeEditor}
                        onIonChange={onFontEditorChange}
                        min={10}
                        max={30}
                        pin={true}
                        snaps={true}
                        title="Font size editor range"
                    >
                        <IonLabel slot="start">Font size </IonLabel>
                    </IonRange>
                </IonItem>
                <IonListHeader>Output</IonListHeader>
                <IonItem>
                    <IonRange
                        value={fontSizeOutput}
                        onIonChange={onFontOutputChange}
                        min={15}
                        max={30}
                        pin={true}
                        snaps={true}
                        title="Font size output range"
                    >
                        <IonLabel slot="start">Font size </IonLabel>
                    </IonRange>
                </IonItem>
            </IonList>
            <IonButton
                className="ion-margin-top"
                color="danger"
                fill="outline"
                expand="block"
                title="Reset appearance options"
                onClick={Utils.resetAppearanceOptions}
            >
                Reset
            </IonButton>
        </>
    );
};

export default Appearance;
