import { IonIcon } from "@ionic/react";
import { arrowRedoOutline, arrowUndoOutline } from "ionicons/icons";
import React from "react";

interface LoideToolbarEditorProps {
    onUndo: () => void;
    onRedo: () => void;
}

const LoideToolbarEditor: React.FC<LoideToolbarEditorProps> = (props) => {
    return (
        <>
            <button title="Undo" className="tab-button" onClick={props.onUndo}>
                <IonIcon style={{ fontSize: "20px" }} icon={arrowUndoOutline} />
            </button>
            <button title="Redo" className="tab-button" onClick={props.onRedo}>
                <IonIcon style={{ fontSize: "20px" }} icon={arrowRedoOutline} />
            </button>
        </>
    );
};

export default LoideToolbarEditor;
