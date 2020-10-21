import React from "react";

interface OutputProps {
    model: string;
    error: string;
}

const Output: React.FC<OutputProps> = (props) => {
    return (
        <div className="loide-output">
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
