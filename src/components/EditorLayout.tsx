import React, { useEffect, useState } from "react";
import ResizePanel from "react-resize-panel";
import { useIsMobile } from "../hooks/useIsMobile";
import { OutputPositions } from "../lib/constants";
import Editor from "./Editor";
import Output from "./Output";

const EditorLayout: React.FC = () => {
    const isMobile = useIsMobile();
    const [outputRight, setOutputRight] = useState(true);

    useEffect(() => {
        if (isMobile) setOutputRight(false);
        else if (!outputRight) setOutputRight(true);
    }, [isMobile, outputRight]);

    return (
        <div className="editor-layout">
            <div className="orizontal">
                <div className="panel">
                    <Editor />
                </div>
                {outputRight && (
                    <ResizePanel
                        direction="w"
                        handleClass="loide-editor-handle horizontal"
                        borderClass="loide-editor-border horizontal"
                    >
                        <div className="panel east">
                            <Output
                                pos={OutputPositions.right}
                                split={() => setOutputRight(false)}
                            />
                        </div>
                    </ResizePanel>
                )}
            </div>

            {!outputRight && (
                <ResizePanel
                    direction="n"
                    handleClass="loide-editor-handle vertical"
                    borderClass="loide-editor-border vertical"
                >
                    <div className="panel south">
                        <Output
                            pos={OutputPositions.bottom}
                            split={() => setOutputRight(true)}
                        />
                    </div>
                </ResizePanel>
            )}
        </div>
    );
};

export default EditorLayout;
