import {
    IonButton,
    IonCol,
    IonInput,
    IonItem,
    IonList,
    IonRow,
    IonText,
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
    const [url, setUrl] = useState<string>("");

    const loideProjectData = useGetLoideProjectData();

    useEffect(() => {
        let URL = window.location.host;
        let params = encodeURIComponent(JSON.stringify(loideProjectData));
        URL += `/${LoidePath.Editor}/` + params;

        setUrl(URL);
    }, [loideProjectData]);

    const [clipboardWriteSupported, setClipboardWriteSupported] = useState<
        boolean
    >(false);

    useEffect(() => {
        let supp = Utils.isClipboardWriteSupported();
        setClipboardWriteSupported(supp);
    }, []);

    const selectAll = (e: any) => {
        e.target.select();
    };

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
                                onFocus={selectAll}
                            />
                        </IonItem>
                    </IonList>
                    {clipboardWriteSupported && (
                        <IonButton
                            expand="block"
                            className="ion-margin-top"
                            title="Copy link"
                            onClick={copyLink}
                        >
                            Copy link
                        </IonButton>
                    )}

                    {!clipboardWriteSupported && (
                        <div className="ion-padding-top">
                            <p className="ion-text-center"></p>
                            <IonText color="dark" className="ion-text-center">
                                <h5>Copy the link and share it.</h5>
                            </IonText>
                        </div>
                    )}
                </IonCol>
            </IonRow>
        </>
    );
};

export default ShareProject;
