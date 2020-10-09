import React from "react";

interface OutputProps {
    model: string;
    error: string;
}

const Output: React.FC<OutputProps> = (props) => {
    return (
        <div className="loide-output">
            {/* <div className="output-settings">
                <span className="output-title"> Output </span>
                <div>
                     <Button variant="light" className="btn-sm mr-2">
                        <FontAwesomeIcon icon="download" />
                    </Button> 
                    <IonButton
                        color="light"
                        size="small"
                        disabled={
                            outputModel.length === 0 && outputError.length === 0
                        }
                        onClick={clearOutput}
                    >
                        <IonIcon icon={backspaceOutline} />
                    </IonButton>
                    {props.pos !== OutputPositions.disabled && (
                        <IonButton
                            color="light"
                            size="small"
                            onClick={props.split}
                        >
                            {props.pos === OutputPositions.right && (
                                <IonIcon icon={chevronDownOutline} />
                            )}
                            {props.pos === OutputPositions.bottom && (
                                <IonIcon icon={chevronUpOutline} />
                            )}
                        </IonButton>
                    )}
                </div>
            </div> */}
            <div className="output-content ion-padding">
                <div className="output-model">{props.model}</div>
                <div
                    className={`output-error ${
                        props.error.length === 0 ? "" : "ion-margin-top"
                    }`}
                >
                    {props.error}
                </div>
            </div>
        </div>
    );
};

export default Output;
