import React, { useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

function onChange(newValue) {
  console.log("change", newValue);
}

const Editor = (props) => {
    return (
        <div className="loide-editor">
            <Tabs defaultActiveKey="tab1">
                <Tab eventKey="tab1" title="tab1">
                    <AceEditor
                        mode="java"
                        theme="github"
                        onChange={onChange}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{ $blockScrolling: true }}
                    />
                </Tab>
            </Tabs>
        </div>
    );
};

export default Editor;
