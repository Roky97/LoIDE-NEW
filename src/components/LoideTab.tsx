import { IonButton, IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import React from "react";
import { ReactNode } from "react";
import { Tab } from "react-tabs";

interface LoideTabProps {
    children: ReactNode;
    tabkey: number;
    onDeleteTab: (e: any, key: number) => void;
}
const LoideTab = ({
    children,
    tabkey,
    onDeleteTab,
    ...otherProps
}: LoideTabProps) => (
    <Tab {...otherProps}>
        <span className="unselectable">{children}</span>
        <IonButton
            title="Delete tab"
            size="small"
            color="danger"
            fill="clear"
            onClick={(e) => {
                if (onDeleteTab) onDeleteTab(e, tabkey);
            }}
        >
            <IonIcon icon={closeOutline} />
        </IonButton>
    </Tab>
);

LoideTab.tabsRole = "Tab"; // Required field to use your custom Tab

export default LoideTab;
