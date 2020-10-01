import React from "react";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalProps } from "../lib/LoideInterfaces";

const AppearanceModal: React.FC<ModalProps> = (props) => {
    return (
        <Modal show={props.show}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <FontAwesomeIcon icon="paint-brush" />
                    <span className="ml-1"> Appearance </span>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo
                    odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
                    risus, porta ac consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger">Reset</Button>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AppearanceModal;
