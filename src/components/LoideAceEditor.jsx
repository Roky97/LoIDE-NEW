import React from "react";
import AceEditor from "react-ace";

import "../lib/ace/mode-asp";
import "ace-builds/src-noconflict/theme-tomorrow";

const LoideAceEditor = (props) => {
    return (
            <AceEditor
                {...props}
            />
    );
};

export default LoideAceEditor;
