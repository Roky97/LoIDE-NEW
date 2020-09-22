import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Option = (props) => {
    var number = props.number;
    var optionTypes = props.optionTypes;

    const getOptions = [...optionTypes].map((option, index) => (
    <option key={`${number}-option-${index}`} value={option.value}> {option.name}</option>
    ));
    return (
        <div className="row row-option">
            <div className="col-sm-12 form-group">
                <div className="badge-option mb-1">
                    <span className=" text-center badge badge-info option-number">
                        Option {props.number}
                    </span>
                    <span className=" text-center badge badge-danger btn-del-option ml-1">
                        <FontAwesomeIcon icon="trash" />
                    </span>
                </div>
                <div className="input-group opname">
                    <select
                        name="option"
                        className="form-control form-control-option custom-select not-alone"
                    >
                        {getOptions}
                    </select>
                </div>
                <div className="option-values">

                </div>
            </div>
        </div>
    );
};

export default Option;
