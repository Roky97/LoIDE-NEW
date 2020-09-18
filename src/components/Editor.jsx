import React, { useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import LoideAceEditor from "./LoideAceEditor";

const Editor = (props) => {
    function onChange(newValue) {
        console.log("change", newValue);
    }

    return (
        <div className="loide-editor">
            <LoideAceEditor
                height={`100%`}
                width={`0px`}
                mode="asp"
                theme="tomorrow"
                // onChange={onChange}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                style={{ flexGrow: 1 }}
            />
        </div>
    );
};

export default Editor;
