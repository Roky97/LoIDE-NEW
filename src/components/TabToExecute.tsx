import React from "react";
import { Form, ListGroup } from "react-bootstrap";
import { CurrentTab } from "../lib/constants";
import { ILoideTab } from "../lib/LoideInterfaces";

interface TabToExecuteProps {
    tabs: Map<number, ILoideTab>;
    tabsIDToExecute: number[];
    onCheckCurrentTab: (value: boolean) => void;
    onCheckTab: (idTab: number, value: boolean) => void;
}

const TabToExecute: React.FC<TabToExecuteProps> = (props) => {
    const onChange = (event: any) => {
        if (event.target.type !== "checkbox") {
            throw new Error("It's not a checkbox!");
        }
        const name: string = event.target.name;
        const value: boolean = event.target.checked;

        if (name === CurrentTab) {
            props.onCheckCurrentTab(value);
            return;
        }
        let idTab = Number(name);

        if (isNaN(idTab)) throw new Error("Can't cast name into a number!");

        props.onCheckTab(idTab, value);
    };

    const getIfChecked = (key: number): boolean => {
        let finded = props.tabsIDToExecute.find(function (id) {
            return id === key;
        });
        return finded ? true : false;
    };

    return (
        <div className="tab-to-execute">
            <h6 className="text-center mt-2">Choose tab to execute</h6>
            <ListGroup className="tab-to-execute-list">
                <ListGroup.Item action className="list-group-item">
                    <Form.Check
                        custom
                        className="checkbox-item"
                        type="checkbox"
                        id={`${CurrentTab}`}
                        label={`Current tab`}
                        name={`${CurrentTab}`}
                        checked={props.tabsIDToExecute.length === 0}
                        onChange={onChange}
                    />
                </ListGroup.Item>

                <ListGroup.Item className="list-divider">
                    <div className="divider"></div>
                </ListGroup.Item>

                {[...props.tabs.keys()].map((key) => (
                    <ListGroup.Item
                        key={`item-tab-${key}`}
                        action
                        className="list-group-item"
                    >
                        <Form.Check
                            custom
                            className="checkbox-item"
                            type="checkbox"
                            id={`item-tab-checkbox-${key}`}
                            label={`${props.tabs.get(key)!.title}`}
                            checked={getIfChecked(key)}
                            name={`${key}`}
                            onChange={onChange}
                        />
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default TabToExecute;
