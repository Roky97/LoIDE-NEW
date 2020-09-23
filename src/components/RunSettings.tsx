import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Option from "./Option"
import { IExecutor, ILanguage, IOptions, ISolver } from "../lib/ts/Language";

interface RunSettingsProps {
    languages: ILanguage[]
}

const RunSettings: React.FC<RunSettingsProps> = ({ languages }) => {

    const [currentLanguage, setCurrentLanguage] = useState('');
    const [currentSolver, setCurrentSolver] = useState('');
    const [currentExecutor, setCurrentExecutor] = useState('');

    useEffect(() => {
        if(languages.length > 0) {
            let firstLanguage = languages[0];
            setCurrentLanguage(firstLanguage.value);
            setCurrentSolver(firstLanguage.solvers[0].value);
            setCurrentExecutor(firstLanguage.solvers[0].executors[0].value)
        }
    }, [languages]);

    const getSolvers = (): ISolver[] => {
        for (let lang of languages) {
            if (lang.value === currentLanguage) {
                return lang.solvers;
            }
        }
        return new Array<ISolver>()
    }

    const getExecutors = (): IExecutor[] => {
        let solvers = getSolvers();
        if (solvers) {
            for (let solver of solvers) {
                if (solver.value === currentSolver) {
                    return solver.executors;
                }
            }
        }
        return new Array<IExecutor>()
    }

    const getOptions = (): IOptions[] => {
        let solvers = getSolvers();
        if (solvers) {
            for (let solver of solvers) {
                if (solver.value === currentSolver) {
                    return solver.options;
                }
            }
        }
        return new Array<IOptions>()
    }

    const selectLanguage = (e: any) => {
        let value = e.target.value;
        let languageSelected: ILanguage | undefined = undefined;
        for (let lang of languages) {
            if (lang.value == value) {
                languageSelected = lang;
                break;
            }
        }
        if (languageSelected) {
            setCurrentLanguage(languageSelected.value);
            setCurrentSolver(languageSelected.solvers[0].value);
            setCurrentExecutor(languageSelected.solvers[0].executors[0].value)
        }
    };

    const selectSolver = (e: any) => {
        let value = e.target.value;
        console.log("selectSolver", value);
        // set state
        setCurrentSolver(value);
    };

    const selectExecutor = (e: any) => {
        let value = e.target.value;
        console.log("selectExecutor", value);
        // set state
        setCurrentExecutor(value);
    };

    const languagesOptions = languages.map((lang, index) => (
        <option key={`language-${index}`} value={lang.value}>
            {lang.name}
        </option>
    ));

    const solversOptions = getSolvers().map((solver, index) => (
        <option key={`solver-${index}`} value={solver.value}>
            {solver.name}
        </option>
    ));

    const executorsOptions = getExecutors().map((executor, index) => (
        <option key={`executor-${index}`} value={executor.value}>
            {executor.name}
        </option>
    ));

    return (
        <div className="run-settings mx-2">
            <div className="text-center run-settings-title sticky-top pt-2 mb-2">
                <h5>Run settings</h5>
            </div>
            <div className="setting-container">
                <Form.Group>
                    <h6 className="text-center mt-2">Language</h6>
                    <Form.Control as="select" onChange={selectLanguage} custom>
                        {languagesOptions}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <h6 className="text-center mt-2">Solver</h6>
                    <Form.Control as="select" onChange={selectSolver} custom>
                        {solversOptions}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <h6 className="text-center mt-2">Executor</h6>
                    <Form.Control as="select" onChange={selectExecutor} custom>
                        {executorsOptions}
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
