import {
    IonItemSliding,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonItemOptions,
    IonItemOption,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import React, { useEffect, useRef } from "react";

interface OptionTextValueProp {
    value: string;
    indexItemOnArray: number;
    lastItem: boolean;
    onChangeValues: (e: any, index: number) => void;
    onAddValue: () => void;
    onDeleteValue: (index: number) => void;
}

const OptionTextValue: React.FC<OptionTextValueProp> = (props) => {
    const slideOptions = useRef<HTMLIonItemSlidingElement>(null);
    const inputText = useRef<HTMLIonInputElement>(null);

    useEffect(() => {
        if (inputText.current) {
            inputText.current.setFocus();
        }
    }, []);

    const onSwipe = (e: any) => {
        props.onDeleteValue(props.indexItemOnArray);
    };
    return (
        <IonItemSliding ref={slideOptions}>
            <IonItem>
                <IonLabel>
                    Option <b> value </b>
                </IonLabel>
                <IonInput
                    ref={inputText}
                    type="text"
                    className="option-value"
                    onIonChange={(e) =>
                        props.onChangeValues(e, props.indexItemOnArray)
                    }
                    value={props.value}
                />
                {props.lastItem && (
                    <IonButton
                        color="light"
                        onClick={(e) => {
                            e.stopPropagation();

                            props.onAddValue();
                        }}
                    >
                        <IonIcon icon={addOutline} />
                        <span> Add value </span>
                    </IonButton>
                )}
            </IonItem>

            <IonItemOptions side="end" onIonSwipe={onSwipe}>
                <IonItemOption
                    expandable={true}
                    color="danger"
                    onClick={(e) => {
                        let opt = slideOptions.current;
                        if (opt) opt.close();
                        props.onDeleteValue(props.indexItemOnArray);
                    }}
                >
                    Delete
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    );
};

export default OptionTextValue;
