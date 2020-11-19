import { IonButton, IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import React from "react";
import { ReactNode } from "react";
import { Tab } from "react-tabs";
import useLongPress from "../hooks/useLongPress";

interface LoideTabProps {
    children: ReactNode;
    tabkey: number;
    onLongPress?: (key: number) => void;
    onDeleteTab: (e: any, key: number) => void;
}
const LoideTab = ({
    children,
    tabkey,
    onLongPress,
    onDeleteTab,
    ...otherProps
}: LoideTabProps) => {
    const onTabLongPress = () => {
        if (onLongPress) onLongPress(tabkey);
    };

    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 500,
    };

    const longPressEvent = useLongPress(
        onTabLongPress,
        () => {},
        defaultOptions
    );

    return (
        <Tab {...otherProps} {...longPressEvent}>
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
};

LoideTab.tabsRole = "Tab"; // Required field to use your custom Tab

export default LoideTab;
