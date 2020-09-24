import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Option from "./Option"
import { IExecutorData, ILanguageData, IOptionsData, ISolverData } from "../lib/ts/Language";
import { SolverOption } from "../lib/ts/LoideInterfaces";

interface RunSettingsProps {
    languages: ILanguageData[]
}

const RunSettings: React.FC<RunSettingsProps> = ({ languages }) => {

    const [currentLanguage, setCurrentLanguage] = useState('');
    const [currentSolver, setCurrentSolver] = useState('');
    const [currentExecutor, setCurrentExecutor] = useState('');
    const [currentOptions, setCurrentOptions] = useState(new Array<SolverOption>());

    useEffect(() => {
        if (languages.length > 0) {
            let firstLanguage = languages[0];
            setCurrentLanguage(firstLanguage.value);
            setCurrentSolver(firstLanguage.solvers[0].value);
            setCurrentExecutor(firstLanguage.solvers[0].executors[0].value)
        }
    }, [languages]);

    const getSolvers = (): ISolverData[] => {
        for (let lang of languages) {
            if (lang.value === currentLanguage) {
                return lang.solvers;
            }
        }
        return new Array<ISolverData>()
    }

    const getExecutors = (): IExecutorData[] => {
        let solvers = getSolvers();
        if (solvers) {
            for (let solver of solvers) {
                if (solver.value === currentSolver) {
                    return solver.executors;
                }
            }
        }
        return new Array<IExecutorData>()
    }

    const getOptions = (): IOptionsData[] => {
        let solvers = getSolvers();
        if (solvers) {
            for (let solver of solvers) {
                if (solver.value === currentSolver) {
                    return solver.options ? solver.options : new Array<IOptionsData>();
                }
            }
        }
        return new Array<IOptionsData>()
    }

    const selectLanguage = (e: any) => {
        let value = e.target.value;
        let languageSelected: ILanguageData | undefined = undefined;
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
            // reset all the options
            setCurrentOptions(new Array<SolverOption>());
        }
    };

    const selectSolver = (e: any) => {
        let value = e.target.value;
        setCurrentSolver(value);
    };

    const selectExecutor = (e: any) => {
        let value = e.target.value;
        setCurrentExecutor(value);
    };

    const addOption = () => {
        let optionsAvailable = getOptions();
        if (optionsAvailable.length > 0) {
            let nextOptions: SolverOption[] = [...currentOptions, { id: currentOptions.length, name: optionsAvailable[0].value, values: [''] }]
            setCurrentOptions(nextOptions);
        }
    }

    const onDeleteOption = (id: number) => {
        let nextOptions = [...currentOptions];
        nextOptions.splice(id,1);
        nextOptions.map((opt, index) => {
            opt.id = index;
        })
        setCurrentOptions(nextOptions);
    }

    const onOptionChangeType = (newValue: any, id: number) => {
        let nextOptions = [...currentOptions];
        for (let option of nextOptions) {
            if (option.id === id) {
                option.name = newValue;
                break;
            }
        }
        setCurrentOptions(nextOptions);
    }

    const onChangeOptionValues = (newValues: string[], id: number) => {
        let nextOptions = [...currentOptions];
        for (let option of nextOptions) {
            if (option.id === id) {
                option.values = newValues;
                break;
            }
        }
        setCurrentOptions(nextOptions);
    }

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

            {getOptions().length > 0 &&
                <div className="setting-container my-2">
                    <h6 className="text-center mt-2"> Options </h6>
                    {currentOptions.map(option => (
                        <Option
                            key={`solver-option-${option.id}`}
                            optionsAvailable={getOptions()}
                            optionData={option} onChangeOptionType={onOptionChangeType}
                            onChangeOptionValues={onChangeOptionValues}
                            onDeleteOption={onDeleteOption}/>
                    ))}
                    <Button className="btn-block" onClick={addOption}>
                        <FontAwesomeIcon icon="plus" />
                    </Button>
                </div>
            }
        </div>
    );
};

export default RunSettings;
