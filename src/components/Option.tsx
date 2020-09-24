import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SolverOption } from "../lib/ts/LoideInterfaces";
import { IOptionsData } from "../lib/ts/Language";
import { Button, Form, InputGroup } from "react-bootstrap";
interface OptionProps {
    optionsAvailable: IOptionsData[];
    optionData: SolverOption;
    onDelete?: () => void;
    onChangeOptionType?: (newValue: string, id: number) => void;
    onChangeOptionValues?: (newValues: string[], id: number) => void;
    onDeleteOption?: (id: number) => void;
}
const Option: React.FC<OptionProps> = (props) => {
    var option = props.optionData;
    var optionsAvailable = props.optionsAvailable;
    const [values, setValues] = useState([""]);

    useEffect(() => {
        setValues([...option.values])
    }, [props.optionData])

    const onChangeOptionType = (e: any) => {
        if (props.onChangeOptionType) props.onChangeOptionType(e.target.value, option.id);
    }

    const onChangeValues = (e: any, index: number) => {
        let newValue = e.target.value;
        let newValues = [...values];
        newValues[index] = newValue;
        setValues(newValues);
        if (props.onChangeOptionValues) props.onChangeOptionValues(newValues, option.id);
    }

    const addValue = () => {
        let newValues = [...values];
        newValues.push("");
        setValues(newValues);
        if (props.onChangeOptionValues) props.onChangeOptionValues(newValues, option.id);
    }

    const deleteValue = (index: number) => {
        let newValues = [...values];
        newValues.splice(index, 1);
        if (newValues.length === 0) newValues.push("");
        setValues(newValues);
        if (props.onChangeOptionValues) props.onChangeOptionValues(newValues, option.id);
    }

    const deleteOption = () => {
        if (props.onDeleteOption) props.onDeleteOption(option.id);
    }

    const wordArgument = (): boolean => {
        for (let opt of optionsAvailable) {
            if (opt.value === option.name && !opt.word_argument) {
                return false;
            }
        }
        return true;
    }

    const options = [...optionsAvailable].map((opt, index) => (
        <option key={`${option.id}-option-${index}`} value={opt.value}> {opt.name}</option>
    ));

    const optionValues = [...values].map((opt, index) => (
        <InputGroup key={`${option.id}-option-value-${index}`} className="loide-solver-option">
            <Form.Control type="text" className="form-control-value option-value" onChange={e => onChangeValues(e, index)} value={opt} />
            <span className="btn-del-value" onClick={() => deleteValue(index)}>
                <FontAwesomeIcon icon="trash" />
            </span>
        </InputGroup>
    ));

    return (
        <div className="row row-option">
            <Form.Group className="col-sm-12">
                <div className="badge-option mb-1">
                    <span className="text-center badge badge-info option-number">
                        Option {option.id + 1}
                    </span>
                    <span className="text-center badge badge-danger btn-del-option ml-1" onClick={deleteOption}>
                        <FontAwesomeIcon icon="trash" />
                    </span>
                </div>
                <div className="input-group opname">
                    <Form.Control
                        as="select"
                        custom
                        onChange={onChangeOptionType}
                        className={`${wordArgument() ? "not-alone" : ""}`}
                        value={option.name}
                    >
                        {options}
                    </Form.Control>
                </div>
                {wordArgument() &&
                    <>
                        <div className="option-values">
                            {optionValues}
                        </div>
                        <Button variant="light" className="btn-add btn-block" onClick={addValue}>
                            <FontAwesomeIcon icon="plus" />
                            <span> Add value </span>
                        </Button>
                    </>
                }
            </Form.Group>
        </div>
    );
};

export default Option;
