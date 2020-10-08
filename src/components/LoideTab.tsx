import { IonButton, IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import React from "react";
import { Tab } from "react-tabs";

const LoideTab = (props: any) => (
    <Tab {...props}>
        <span>{props.children}</span>
        <IonButton
            // className="delete-tab"
            size="small"
            color="danger"
            fill="clear"
            onClick={(e) => {
                if (props.onDeleteTab) props.onDeleteTab(e, props.tabkey);
            }}
        >
            <IonIcon icon={closeOutline} />
        </IonButton>
    </Tab>
);

LoideTab.tabsRole = "Tab"; // Required field to use your custom Tab

export default LoideTab;
