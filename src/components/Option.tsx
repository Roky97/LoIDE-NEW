import React, { useEffect, useState } from "react";
import { ISolverOption } from "../lib/LoideInterfaces";
import { IOptionsData } from "../lib/LoideAPIInterfaces";
import {
    IonBadge,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonSelect,
    IonSelectOption,
} from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import OptionTextValue from "./OptionTextValue";

interface OptionProps {
    optionsAvailable: IOptionsData[];
    optionData: ISolverOption;
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
        setValues([...props.optionData.values]);
    }, [props.optionData]);

    const onChangeOptionType = (e: any) => {
        if (props.onChangeOptionType)
            props.onChangeOptionType(e.target.value, option.id);
    };

    const onChangeValues = (e: any, index: number) => {
        let newValue = e.target.value;
        console.log("values", e);
        let newValues = [...values];
        newValues[index] = newValue;
        setValues(newValues);
        if (props.onChangeOptionValues)
            props.onChangeOptionValues(newValues, option.id);
    };

    const addValue = () => {
        let newValues = [...values];
        newValues.push("");
        setValues(newValues);
        if (props.onChangeOptionValues)
            props.onChangeOptionValues(newValues, option.id);
    };

    const deleteValue = (index: number) => {
        let newValues = [...values];
        newValues.splice(index, 1);
        if (newValues.length === 0) newValues.push("");
        setValues(newValues);
        if (props.onChangeOptionValues)
            props.onChangeOptionValues(newValues, option.id);
    };

    const deleteOption = () => {
        if (props.onDeleteOption) props.onDeleteOption(option.id);
    };

    const wordArgument = (): boolean => {
        for (let opt of optionsAvailable) {
            if (opt.value === option.name && !opt.word_argument) {
                return false;
            }
        }
        return true;
    };

    const options = [...optionsAvailable].map((opt, index) => (
        <IonSelectOption key={`${option.id}-option-${index}`} value={opt.value}>
            {opt.name}
        </IonSelectOption>
    ));

    const optionValues = [...values].map((opt, index) => {
        return (
            <OptionTextValue
                value={opt}
                indexItemOnArray={index}
                lastItem={index === values.length - 1}
                onDeleteValue={deleteValue}
                onAddValue={addValue}
                onChangeValues={onChangeValues}
                key={`${option.id}-option-value-${index}`}
            />
        );
    });

    return (
        <IonList className="ion-margin-bottom">
            <IonItem>
                <IonBadge>Option {option.id + 1}</IonBadge>
                <IonButton slot="end" color="danger" onClick={deleteOption}>
                    <IonIcon icon={trashOutline} />
                    Delete option
                </IonButton>
            </IonItem>
            <IonItem>
                <IonLabel>
                    Option <b>name</b>
                </IonLabel>

                <IonSelect onIonChange={onChangeOptionType} value={option.name}>
                    {options}
                </IonSelect>
            </IonItem>

            {wordArgument() && <>{optionValues}</>}
        </IonList>
    );
};

export default Option;
