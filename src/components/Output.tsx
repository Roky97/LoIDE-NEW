import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { OutputPositions } from "../lib/constants";
import { OutputStore } from "../lib/store";

interface OutputProps {
    pos: string;
    split: () => void;
}

const Output: React.FC<OutputProps> = (props) => {
    const outputModel = OutputStore.useState((o) => o.model);
    const outputError = OutputStore.useState((o) => o.error);

    return (
        <div className="loide-output">
            <div className="output-settings">
                <span className="output-title"> Output </span>
                <div>
                    <Button variant="light" className="btn-sm mr-2">
                        <FontAwesomeIcon icon="download" />
                        {/* put tooltip */}
                    </Button>
                    <Button variant="light" className="btn-sm mr-2">
                        <FontAwesomeIcon icon="eraser" />
                        {/* put tooltip */}
                    </Button>
                    <Button
                        variant="light"
                        className="btn-sm mr-2"
                        onClick={props.split}
                    >
                        {props.pos === OutputPositions.right && (
                            <FontAwesomeIcon icon="chevron-down" />
                        )}
                        {props.pos === OutputPositions.bottom && (
                            <FontAwesomeIcon icon="chevron-up" />
                        )}
                    </Button>
                </div>
            </div>
            <div className="output-content">
                <div className="output-model pb-2">{outputModel}</div>
                <div className="output-error">{outputError}</div>
            </div>
        </div>
    );
};

export default Output;
