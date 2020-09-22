import React from "react";
import { Tab } from "react-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoideTab = (props) => (
    <Tab {...props}>
        {props.children}
        <a className="delete-tab ml-2" onClick={() => {if (props.onDeleteTab) props.onDeleteTab(props.tabKey)}}>
            <FontAwesomeIcon icon="times" />
        </a>
    </Tab>
);

LoideTab.tabsRole = "Tab"; // Required field to use your custom Tab

export default LoideTab;
