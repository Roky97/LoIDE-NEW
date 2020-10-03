import React from "react";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalProps } from "../lib/LoideInterfaces";
import logo from "../assets/img/logo_LoIDE.svg";
import { LoideVersion } from "../lib/constants";

const AboutModal: React.FC<ModalProps> = (props) => {
    return (
        <Modal show={props.show} onHide={props.onHide} scrollable={true}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <FontAwesomeIcon icon="info-circle" />
                    <span className="ml-1">
                        About <em>LoIDE</em>
                    </span>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="text-center">
                    <div className="d-flex justify-content-center align-items-center">
                        <img
                            src={logo}
                            className="about-logo"
                            width="150"
                            alt="logo"
                        />
                        <span className="font-pwa about-modal">(PWA)</span>
                    </div>

                    <p className="mt-2">
                        <em>
                            Version:
                            <span className="version"> {LoideVersion}</span>
                        </em>
                    </p>
                </div>
                <p className="text-center">
                    <em>
                        LoIDE PWA is a Progressive Web App IDE for Logic
                        Programming
                    </em>
                    <br />
                </p>

                <p className="text-justify">
                    Checkout the LoIDE project website: <br />
                    <a
                        href="https://demacs-unical.github.io/LoIDE/"
                        rel="noopener"
                        target="_blank"
                    >
                        demacs-unical.github.io/LoIDE
                    </a>
                </p>
                <p>
                    LoIDE is an Open Source project available on{" "}
                    <a href="#" rel="noopener" target="_blank">
                        Github <i className="fa fa-github"></i>
                    </a>
                </p>
                <p className="text-justify">
                    It's released under{" "}
                    <a
                        href="https://github.com/DeMaCS-UNICAL/LoIDE/blob/master/LICENSE"
                        rel="noopener"
                        target="_blank"
                    >
                        MIT License
                    </a>
                </p>

                <p className="text-justify">
                    If you have any questions or suggestions, please write an
                    e-mail to{" "}
                    <em>
                        loide<span style={{ display: "none" }}>ABC</span>
                        @mat.unical.it{" "}
                    </em>
                </p>

                <p className="text-justify">
                    <strong>
                        Use of all solvers and systems is provided under the
                        respective licenses; we refrain from taking any
                        responsibility for any use that goes out of the scopes
                        of such licenses.
                    </strong>
                </p>

                <p className="text-justify">
                    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
                    KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
                    WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                    PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
                    OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
                    OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                    OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
                    SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
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

export default AboutModal;
