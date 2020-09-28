import React, { useEffect, useState } from "react";
import LoideAceEditor from "./LoideAceEditor";
import LoideTab from "./LoideTab";
import { Tabs, TabList, TabPanel } from "react-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditorStore, RunSettingsStore } from "../lib/store";
import { ILoideTab } from "../lib/ts/LoideInterfaces";
import { InitalTabCountID } from "../lib/ts/constant";

const Editor: React.FC = () => {
    const [tabCountID, setTabCountID] = useState(InitalTabCountID);
    const tabIndex = EditorStore.useState((e) => e.currentTab);
    const tabs = EditorStore.useState((e) => e.tabs);

    useEffect(() => {
        if (tabs.size === 0) {
            EditorStore.update((e) => {
                e.tabs = new Map<number, ILoideTab>().set(tabCountID, {
                    title: `L P ${tabCountID}`,
                    type: "",
                    value: "",
                });
                e.currentTab = 0;
            });
        }
    }, []);

    const onChange = (tabKey: number, value: string) => {
        let tab: ILoideTab = Object.assign({}, tabs.get(tabKey));

        if (tab) {
            tab.value = value;

            let nextTabs = new Map(tabs);
            nextTabs.set(tabKey, tab);

            EditorStore.update((e) => {
                e.tabs = nextTabs;
            });
        }
    };

    const onSelectTab = (index: number) => {
        EditorStore.update((e) => {
            e.currentTab = index;
        });
    };

    const onDeleteTab = (e: any, tabKey: number) => {
        e.stopPropagation();
        let r = confirm(
            "Are you sure you want to delete this tab? This cannot be undone."
        );
        if (r) {
            if (tabs.size === 1) {
                setTabCountID(1);
                let nextTabs = new Map().set(1, {
                    title: `L P 1`,
                    type: "",
                    value: "",
                });
                EditorStore.update((e) => {
                    e.tabs = nextTabs;
                    e.currentTab = 0;
                });
                return;
            }
            let nextTabs = new Map(tabs);
            nextTabs.delete(tabKey);
            let shift = tabs.size - 1 === tabIndex ? true : false;
            EditorStore.update((e) => {
                e.currentTab = shift ? e.currentTab - 1 : e.currentTab;
                e.tabs = nextTabs;
            });
        }
    };

    const addTab = () => {
        let nextID = tabCountID + 1;

        let nextTabs = new Map(tabs);
        nextTabs.set(nextID, {
            title: `L P ${nextID}`,
            type: "asp",
            value: "",
        });

        EditorStore.update((e) => {
            e.currentTab = nextTabs.size - 1;
            e.tabs = nextTabs;
        });

        EditorStore.update((e) => {
            e.tabs = nextTabs;
        });

        setTabCountID(tabCountID + 1);
    };

    const loideTabs = [...tabs.keys()].map((key) => (
        <LoideTab key={`tab-${key}`} tabkey={key} onDeleteTab={onDeleteTab}>
            {tabs.get(key)!.title}
        </LoideTab>
    ));

    const tabPanels = [...tabs.keys()].map((key) => (
        <TabPanel key={`tabpanel-${key}`}>
            <LoideAceEditor
                tabKey={key}
                mode="asp"
                value={tabs.get(key)!.value}
                onChange={onChange}
            />
        </TabPanel>
    ));

    return (
        <div className="loide-editor">
            <Tabs
                className="loide-tabs"
                selectedIndex={tabIndex}
                onSelect={onSelectTab}
            >
                <div className="loide-tab-list">
                    <div className="loide-tab-list-container">
                        <TabList>{loideTabs}</TabList>
                    </div>
                    <button className="ml-1 react-tabs__tab" onClick={addTab}>
                        <FontAwesomeIcon icon="plus" />
                    </button>
                </div>
                {tabPanels}
            </Tabs>
        </div>
    );
};

export default Editor;
