import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Option from "./Option"

const RunSettings = (props) => {
    var configData = props.configData;

    var options = [];

    // const [launguage, setLanguage] = useState(configData.languages[0]);
    // const [solver, setSolver] = useState(configData.solvers[0]);
    // const [executor, setExecutor] = useState(configData.executors[0]);

    const getLanguages = [...configData.languages].map((lang, index) => (
        <option key={`language-${index}`} value={lang.value}>
            {lang.name}
        </option>
    ));

    const getSolvers = [...configData.solvers].map((solver, index) => (
        <option key={`solver-${index}`} value={solver.value}>
            {solver.name}
        </option>
    ));

    const getExecutors = [...configData.executors].map((executor, index) => (
        <option key={`executor-${index}`} value={executor.value}>
            {executor.name}
        </option>
    ));

    const selectLanguage = (e) => {
        let value = e.target.value;
        console.log("selectLanguage", value);
        // set state
    };

    const selectSolver = (e) => {
        let value = e.target.value;
        console.log("selectSolver", value);
        // set state
    };

    const selectExecutor = (e) => {
        let value = e.target.value;
        console.log("selectExecutor", value);
        // set state
    };

    return (
        <div className="run-settings mx-2">
            <div className="text-center run-settings-title sticky-top pt-2 mb-2">
                <h5>Run settings</h5>
            </div>
            <div className="setting-container">
                <Form.Group>
                    <h6 className="text-center mt-2">Language</h6>
                    <Form.Control as="select" onChange={selectLanguage} custom>
                        {getLanguages}
                    </Form.Control>
                </Form.Group>
            </div>
            <div className="setting-container mt-2">
                <Form.Group>
                    <h6 className="text-center mt-2">Solver</h6>
                    <Form.Control as="select" onChange={selectSolver} custom>
                        {getSolvers}
                    </Form.Control>
                </Form.Group>
            </div>

            <div className="setting-container mt-2">
                <Form.Group>
                    <h6 className="text-center mt-2">Executor</h6>
                    <Form.Control as="select" onChange={selectExecutor} custom>
                        {getExecutors}
                    </Form.Control>
                </Form.Group>
            </div>

            <div className="setting-container mt-2">
                <h6 className="text-center mt-2"> Options </h6>
                {/* <Option language="asp" optionTypes={[{value: "free-choice", text: "Free choice"},{value: "filter", text: "Filter"}]}/> */}
                <Button className="btn-block">
                    <FontAwesomeIcon icon="plus" />
                </Button>
            </div>
        </div>
    );
};

export default RunSettings;
