import React from "react";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InfoModal = (props) => {
    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <FontAwesomeIcon icon="info" />
                    <span className="ml-1"> Info </span>
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
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InfoModal;
