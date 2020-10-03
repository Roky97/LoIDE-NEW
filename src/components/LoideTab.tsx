import React from "react";
import { Tab } from "react-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoideTab = (props: any) => (
    <Tab {...props}>
        {props.children}
        <span
            className="delete-tab ml-2"
            onClick={(e) => {
                if (props.onDeleteTab) props.onDeleteTab(e, props.tabkey);
            }}
        >
            <FontAwesomeIcon icon="times" />
        </span>
    </Tab>
);

LoideTab.tabsRole = "Tab"; // Required field to use your custom Tab

export default LoideTab;
