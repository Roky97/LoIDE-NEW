import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ResizePanel from "react-resize-panel";
import Editor from "./Editor";

const EditorLayout = (props) => {
    const [outputRight, setOutputRight] = useState(true);
    return (
        <div className="editor-layout">
            <div className="orizontal">
                <div className="panel">
                    <Editor />
                </div>
                {outputRight && (
                    <ResizePanel direction="w" handleClass="loide-editor-handle horizontal" borderClass="loide-editor-border horizontal">
                        <div className="panel east">
                            <div className="content">
                                <Button onClick={() => setOutputRight(false)}>
                                    Split
                                </Button>
                            </div>
                        </div>
                    </ResizePanel>
                )}
            </div>

            {!outputRight && (
                <ResizePanel direction="n" handleClass="loide-editor-handle vertical" borderClass="loide-editor-border vertical">
                    <div className="panel south">
                        <div>
                            <Button onClick={() => setOutputRight(true)}>
                                Split
                            </Button>
                        </div>
                    </div>
                </ResizePanel>
            )}
        </div>
    );
};

export default EditorLayout;
