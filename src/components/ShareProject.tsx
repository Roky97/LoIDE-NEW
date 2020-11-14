import {
    IonButton,
    IonCol,
    IonInput,
    IonItem,
    IonList,
    IonRow,
} from "@ionic/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useGetLoideProjectData } from "../hooks/useGetLoideProjectData";
import { LoidePath } from "../lib/constants";
import Utils from "../lib/utils";

interface ShareProjectProps {
    onCopyLink?: (done: boolean) => void;
}

const ShareProject: React.FC<ShareProjectProps> = (props) => {
    const [url, setUrl] = useState<string>("loide.demacs.unical.it");

    const loideProjectData = useGetLoideProjectData();

    useEffect(() => {
        let URL = window.location.host;
        let params = encodeURIComponent(JSON.stringify(loideProjectData));
        URL += `/${LoidePath.Editor}/` + params;

        setUrl(URL);
    }, [loideProjectData]);

    const copyLink = () => {
        Utils.copyTextToClipboard(
            url,
            () => {
                Utils.generateGeneralToast(
                    "",
                    "Link copied succefully",
                    "success"
                );

                if (props.onCopyLink) props.onCopyLink(true);
            },
            () => {
                Utils.generateGeneralToast(
                    "",
                    "Cannot copy the link",
                    "danger"
                );
                if (props.onCopyLink) props.onCopyLink(false);
            }
        );
    };

    return (
        <>
            <IonRow>
                <IonCol sizeMd="10" offsetMd="1" sizeLg="8" offsetLg="2">
                    <IonList>
                        <IonItem>
                            <IonInput
                                data-testid="url-input"
                                inputmode="url"
                                value={url}
                                readonly={true}
                            />
                        </IonItem>
                    </IonList>
                    <IonButton
                        disabled={url.length === 0 ? true : false}
                        expand="block"
                        className="ion-margin-top"
                        title="Copy link"
                        onClick={copyLink}
                    >
                        Copy link
                    </IonButton>
                </IonCol>
            </IonRow>
        </>
    );
};

export default ShareProject;
