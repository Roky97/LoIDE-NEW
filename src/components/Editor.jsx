import React, { useState } from "react";
import LoideAceEditor from "./LoideAceEditor";
import LoideTab from "./LoideTab";
import { Tabs, TabList, TabPanel } from "react-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Editor = (props) => {
    const [tabCountID, setTabCountID] = useState(1);
    const [tabs, setTabs] = useState(
        new Map().set(tabCountID, {
            title: `L P ${tabCountID}`,
            type: "asp",
            value: "",
        })
    );

    const onChange = (event) => {
        // console.log("onChange", event);

        let tabKey = event.tabKey;
        let tabValue = event.value;

        let tab = tabs.get(tabKey);
        tab.value = tabValue;

        let nexTabs = new Map(tabs);
        nexTabs.set(tabKey,tab);

        setTabs(nexTabs);
    };

    const onDeleteTab = (e) => {
        // console.log("onDeleteTab", tabs.size);

        let r = confirm(
            "Are you sure you want to delete this tab? This cannot be undone."
        );
        if (r) {
            if (tabs.size === 1) {
                setTabCountID(1);
                setTabs(
                    new Map().set(1, {
                        title: `L P 1`,
                        type: "asp",
                        value: "",
                    })
                );
                return;
            }
            let nextTabs = new Map(tabs);
            nextTabs.delete(e);
            setTabs(nextTabs);
        }
    };

    const addTab = () => {
        let nextID = tabCountID + 1;

        setTabs(
            tabs.set(nextID, {
                title: `L P ${nextID}`,
                type: "asp",
                value: "",
            })
        );

        setTabCountID(tabCountID + 1);
    };

    const loideTabs = [...tabs.keys()].map((key) => (
        <LoideTab key={`tab-${key}`} tabKey={key} onDeleteTab={onDeleteTab}>
            {tabs.get(key).title}
        </LoideTab>
    ));

    const tabPanels = [...tabs.keys()].map((key) => (
        <TabPanel key={`tabpanel-${key}`}>
            <LoideAceEditor
                height={`100%`}
                width={`0px`}
                mode="asp"
                theme="tomorrow"
                name={`editor-${key}`}
                tabKey={key}
                value={tabs.get(key).value}
                editorProps={{
                    $blockScrolling: true,
                }}
                setOptions={{
                    fontSize: 15,
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    cursorStyle: "smooth",
                    copyWithEmptySelection: true,
                    scrollPastEnd: 0.5,
                }}
                onChange={onChange}
                style={{ flexGrow: 1 }}
            />
        </TabPanel>
    ));

    return (
        <div className="loide-editor">
            <Tabs className="loide-tabs">
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
