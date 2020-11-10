import { IonIcon } from "@ionic/react";
import {
    arrowRedoOutline,
    arrowUndoOutline,
    clipboardOutline,
    closeCircleOutline,
    copyOutline,
    cutOutline,
    downloadOutline,
    searchOutline,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import Utils from "../lib/utils";

interface LoideToolbarEditorProps {
    onUndo: () => void;
    onRedo: () => void;
    onSearch: () => void;
    onCut: () => void;
    onCopy: () => void;
    onPaste?: () => void;
    onDownloadTab: () => void;
    onDeleteAllTabs: () => void;
}

const LoideToolbarEditor: React.FC<LoideToolbarEditorProps> = (props) => {
    const [pasteSupported, setPasteSupported] = useState<boolean>(false);

    useEffect(() => {
        setPasteSupported(Utils.isClipboardSupported);
    }, []);
    return (
        <>
            <button
                title="Delete all tabs"
                className="tab-button space-left"
                onClick={props.onDeleteAllTabs}
            >
                <IonIcon
                    style={{ fontSize: "20px" }}
                    icon={closeCircleOutline}
                />
            </button>
            <button
                title="Download content"
                className="tab-button space-left"
                onClick={props.onDownloadTab}
            >
                <IonIcon style={{ fontSize: "20px" }} icon={downloadOutline} />
            </button>

            <button
                title="Cut"
                className="tab-button space-left"
                onClick={props.onCut}
            >
                <IonIcon style={{ fontSize: "20px" }} icon={cutOutline} />
            </button>
            <button title="Copy" className="tab-button" onClick={props.onCopy}>
                <IonIcon style={{ fontSize: "20px" }} icon={copyOutline} />
            </button>
            {pasteSupported && (
                <button
                    title="Paste"
                    className="tab-button"
                    onClick={props.onPaste}
                >
                    <IonIcon
                        style={{ fontSize: "20px" }}
                        icon={clipboardOutline}
                    />
                </button>
            )}

            <button
                title="Search"
                className="tab-button space-left"
                onClick={props.onSearch}
            >
                <IonIcon style={{ fontSize: "20px" }} icon={searchOutline} />
            </button>
            <button
                title="Undo"
                className="tab-button space-left"
                onClick={props.onUndo}
            >
                <IonIcon style={{ fontSize: "20px" }} icon={arrowUndoOutline} />
            </button>
            <button title="Redo" className="tab-button" onClick={props.onRedo}>
                <IonIcon style={{ fontSize: "20px" }} icon={arrowRedoOutline} />
            </button>
        </>
    );
};

export default LoideToolbarEditor;
