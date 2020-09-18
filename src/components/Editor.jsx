import React, { useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import LoideAceEditor from "./LoideAceEditor";

const Editor = (props) => {
    return (
        <div className="loide-editor">
            <LoideAceEditor
                height={`100%`}
                width={`0px`}
                mode="asp"
                theme="tomorrow"
                name="UNIQUE_ID_OF_DIV"
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
                style={{ flexGrow: 1 }}
            />
        </div>
    );
};

export default Editor;
