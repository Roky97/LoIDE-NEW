import { IonButton, IonCol, IonRow, IonSpinner } from "@ionic/react";
import React from "react";
import API from "../lib/api";
import { SocketStatusStore, UIStatusStore } from "../lib/store";
import { Offline, Online } from "react-detect-offline";

const NoLanguageAvailable: React.FC = () => {
    const reconnecting = UIStatusStore.useState((s) => s.connectingToTheServer);

    const connectedFromServer = SocketStatusStore.useState((s) => s.connected);

    const onReconnect = () => {
        API.emitGetLanguages();
    };
    return (
        <>
            <IonRow>
                <IonCol className="ion-text-center ion-padding">
                    <h4 className="ion-margin-bottom">No language available</h4>
                    <Online>
                        {!connectedFromServer && (
                            <>
                                <h5
                                    className="ion-margin-bottom"
                                    style={{ opacity: 0.6 }}
                                >
                                    You are disconnect from the server, try to
                                    reconnect
                                </h5>
                                <IonButton
                                    onClick={onReconnect}
                                    disabled={reconnecting}
                                >
                                    {reconnecting && <IonSpinner />}
                                    {!reconnecting && <>Reconnect</>}
                                </IonButton>
                            </>
                        )}
                    </Online>
                    <Offline>
                        <h5
                            className="ion-margin-bottom"
                            style={{ opacity: 0.6 }}
                        >
                            You are offline, connect to the internet
                        </h5>
                    </Offline>
                </IonCol>
            </IonRow>
        </>
    );
};

export default NoLanguageAvailable;
