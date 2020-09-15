import React from "react";
import {
    Navbar,
    Nav,
    Button,
    ButtonGroup,
    OverlayTrigger,
    Tooltip,
    Popover,
} from "react-bootstrap";
import logo from "../Assets/img/logo_LoIDE.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfoModal from "./InfoModal";
import AppearanceModal from "./AppearanceModal";
import SavePopover from "./SavePopover";
import SharePopover from "./SharePopover";

const LoideNavbar = (props) => {
    const [appearanceModalShow, setAppearanceModalShow] = React.useState(false);
    const [infoModalShow, setInfoModalShow] = React.useState(false);

    return (
        <>
            <Navbar expand="sm" style={{ backgroundColor: "white" }}>
                <Navbar.Brand>
                    <img className="navbar-logo" src={logo} alt="LoIDE logo" />
                </Navbar.Brand>

                <Nav className="ml-4">
                    <Nav.Item>
                        <ButtonGroup>
                            <OverlayTrigger
                                key="run-option-tooltip"
                                placement="bottom"
                                overlay={<Tooltip>Run option</Tooltip>}
                            >
                                <Button
                                    variant="secondary"
                                    onClick={() =>
                                        props.sidebar.toggle(
                                            !props.sidebar.show
                                        )
                                    }
                                >
                                    <FontAwesomeIcon icon="cogs" />
                                </Button>
                            </OverlayTrigger>
                            <Button variant="success">
                                <FontAwesomeIcon icon="play" />
                                <span className="ml-2">Run</span>
                            </Button>
                        </ButtonGroup>
                    </Nav.Item>
                </Nav>

                <Navbar.Toggle />

                <Navbar.Collapse>
                    <Nav className="mr-auto ml-auto">
                        <Nav.Item className="mr-2">
                            <Button
                                variant="info"
                                className="btn-block"
                                onClick={() => setAppearanceModalShow(true)}
                            >
                                <FontAwesomeIcon icon="paint-brush" />
                                <span className="ml-2">Appearance</span>
                            </Button>
                        </Nav.Item>
                        <Nav.Item>
                            <Button
                                variant="outline-info"
                                className="btn-block"
                                onClick={() => setInfoModalShow(true)}
                            >
                                <FontAwesomeIcon icon="info" />
                                <span className="ml-2">Info </span>
                            </Button>
                        </Nav.Item>
                    </Nav>

                    <Nav>
                        <Nav.Item>
                            <ButtonGroup className="btn-block">
                                <Button
                                    variant="warning"
                                    onClick={() =>
                                        props.openbar.toggle(
                                            !props.openbar.show
                                        )
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon="folder-open"
                                        style={{ color: "white" }}
                                    />
                                    <span
                                        className="ml-2"
                                        style={{ color: "white" }}
                                    >
                                        Open
                                    </span>
                                </Button>
                                <OverlayTrigger
                                    key="save-popover"
                                    trigger="click"
                                    placement="bottom"
                                    overlay={SavePopover}
                                    rootClose
                                >
                                    <Button variant="info">
                                        <FontAwesomeIcon icon="save" />
                                        <span className="ml-2">Save</span>
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    key="share-popover"
                                    trigger="click"
                                    placement="bottom"
                                    overlay={SharePopover}
                                    rootClose
                                >
                                    <Button variant="success">
                                        <FontAwesomeIcon icon="link" />
                                        <span className="ml-2">Share</span>
                                    </Button>
                                </OverlayTrigger>
                            </ButtonGroup>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <AppearanceModal
                show={appearanceModalShow}
                onHide={() => setAppearanceModalShow(false)}
            />
            <InfoModal
                show={infoModalShow}
                onHide={() => setInfoModalShow(false)}
            />
        </>
    );
};

export default LoideNavbar;
