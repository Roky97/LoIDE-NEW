import {
    IonCheckbox,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonList,
    IonListHeader,
} from "@ionic/react";
import React from "react";
import { CurrentTab } from "../lib/constants";
import { ILoideTab } from "../lib/LoideInterfaces";

interface TabToExecuteProps {
    tabs: Map<number, ILoideTab>;
    tabsIDToExecute: number[];
    onCheckCurrentTab: (value: boolean) => void;
    onCheckTab: (idTab: number, value: boolean) => void;
}

const TabToExecute: React.FC<TabToExecuteProps> = (props) => {
    const onChange = (event: any) => {
        const name: string = event.target.name;
        const value: boolean = event.target.checked;

        if (name === CurrentTab) {
            props.onCheckCurrentTab(value);
            return;
        }
        let idTab = Number(name);

        if (isNaN(idTab)) throw new Error("Can't cast name into a number!");

        props.onCheckTab(idTab, value);
    };

    const getIfChecked = (key: number): boolean => {
        let finded = props.tabsIDToExecute.find(function (id) {
            return id === key;
        });
        return finded ? true : false;
    };

    return (
        <>
            <IonList>
                <IonListHeader>
                    <IonLabel>Choose tab to execute</IonLabel>
                </IonListHeader>
                <IonItem>
                    <IonLabel> Current tab </IonLabel>
                    <IonCheckbox
                        slot="start"
                        name={`${CurrentTab}`}
                        checked={props.tabsIDToExecute.length === 0}
                        onIonChange={onChange}
                    />
                </IonItem>

                <IonItemDivider mode="ios" className="tab-to-execute-divider" />

                {[...props.tabs.keys()].map((key) => (
                    <IonItem key={`item-tab-${key}`}>
                        <IonLabel> {`${props.tabs.get(key)!.title}`} </IonLabel>
                        <IonCheckbox
                            slot="start"
                            name={`${key}`}
                            checked={getIfChecked(key)}
                            onIonChange={onChange}
                        />
                    </IonItem>
                ))}
            </IonList>
        </>
    );
};

export default TabToExecute;
