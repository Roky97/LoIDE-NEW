import React from "react";
import Option from "./Option";
import {
    IExecutorData,
    ILanguageData,
    IOptionsData,
    ISolverData,
} from "../lib/LoideAPIInterfaces";
import { ISolverOption } from "../lib/LoideInterfaces";
import { EditorStore, RunSettingsStore } from "../lib/store";
import {
    IonButton,
    IonCol,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonRow,
    IonSelect,
    IonSelectOption,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import TabToExecute from "./TabToExecute";

interface RunSettingsProps {
    languages: ILanguageData[];
}

const RunSettings: React.FC<RunSettingsProps> = ({ languages }) => {
    const currentLanguage = RunSettingsStore.useState((l) => l.currentLanguage);
    const currentSolver = RunSettingsStore.useState((l) => l.currentSolver);
    const currentExecutor = RunSettingsStore.useState((l) => l.currentExecutor);
    const currentOptions = RunSettingsStore.useState((l) => l.currentOptions);
    const tabsIDToExecute = RunSettingsStore.useState((l) => l.tabsIDToExecute);

    const editorTabs = EditorStore.useState((e) => e.tabs);

    const getSolvers = (): ISolverData[] => {
        for (let lang of languages) {
            if (lang.value === currentLanguage) {
                return lang.solvers;
            }
        }
        return new Array<ISolverData>();
    };

    const getExecutors = (): IExecutorData[] => {
        let solvers = getSolvers();
        if (solvers) {
            for (let solver of solvers) {
                if (solver.value === currentSolver) {
                    return solver.executors;
                }
            }
        }
        return new Array<IExecutorData>();
    };

    const getOptions = (): IOptionsData[] => {
        let solvers = getSolvers();
        if (solvers) {
            for (let solver of solvers) {
                if (solver.value === currentSolver) {
                    return solver.options
                        ? solver.options
                        : new Array<IOptionsData>();
                }
            }
        }
        return new Array<IOptionsData>();
    };

    const selectLanguage = (e: any) => {
        let value = e.target.value;
        console.log(value);
        let languageSelected: ILanguageData | undefined = undefined;
        for (let lang of languages) {
            if (lang.value === value) {
                languageSelected = lang;
                break;
            }
        }
        if (languageSelected) {
            RunSettingsStore.update((settings) => {
                settings.currentLanguage = languageSelected!.value;
            });
            RunSettingsStore.update((settings) => {
                settings.currentSolver = languageSelected!.solvers[0].value;
            });
            RunSettingsStore.update((settings) => {
                settings.currentExecutor = languageSelected!.solvers[0].executors[0].value;
            });
            // reset all the options
            RunSettingsStore.update((settings) => {
                settings.currentOptions = [];
            });
        }
    };

    const selectSolver = (e: any) => {
        let value = e.target.value;
        RunSettingsStore.update((settings) => {
            settings.currentSolver = value;
        });
    };

    const selectExecutor = (e: any) => {
        let value = e.target.value;
        RunSettingsStore.update((settings) => {
            settings.currentExecutor = value;
        });
    };

    const addOption = () => {
        let optionsAvailable = getOptions();
        if (optionsAvailable.length > 0) {
            let nextOptions: ISolverOption[] = [
                ...currentOptions,
                {
                    id: currentOptions.length,
                    name: optionsAvailable[0].value,
                    values: [""],
                },
            ];
            RunSettingsStore.update((settings) => {
                settings.currentOptions = nextOptions;
            });
        }
    };

    const onDeleteOption = (id: number) => {
        let nextOptions: ISolverOption[] = JSON.parse(
            JSON.stringify(currentOptions)
        ); // clone current options

        nextOptions.splice(id, 1);
        nextOptions.map((opt, index) => (opt.id = index));
        RunSettingsStore.update((settings) => {
            settings.currentOptions = nextOptions;
        });
    };

    const onChangeOptionType = (newValue: any, id: number) => {
        let nextOptions: ISolverOption[] = JSON.parse(
            JSON.stringify(currentOptions)
        ); // clone current options
        for (let option of nextOptions) {
            if (option.id === id) {
                option.name = newValue;
                break;
            }
        }
        RunSettingsStore.update((settings) => {
            settings.currentOptions = nextOptions;
        });
    };

    const onChangeOptionValues = (newValues: string[], id: number) => {
        let nextOptions: ISolverOption[] = JSON.parse(
            JSON.stringify(currentOptions)
        ); // clone current options
        for (let option of nextOptions) {
            if (option.id === id) {
                option.values = newValues;
                break;
            }
        }
        RunSettingsStore.update((settings) => {
            settings.currentOptions = nextOptions;
        });
    };

    const onCheckTab = (idTab: number, value: boolean) => {
        let index = tabsIDToExecute.indexOf(idTab);
        RunSettingsStore.update((settings) => {
            let nextTabIDs = [...settings.tabsIDToExecute];
            if (index === -1) nextTabIDs.push(idTab);
            else nextTabIDs.splice(index, 1);
            settings.tabsIDToExecute = nextTabIDs;
        });
    };
    const onCheckCurrentTab = (value: boolean) => {
        if (value)
            RunSettingsStore.update((settings) => {
                settings.tabsIDToExecute = [];
            });
    };

    const languagesOptions = languages.map((lang, index) => (
        <IonSelectOption key={`language-${index}`} value={lang.value}>
            {lang.name}
        </IonSelectOption>
    ));

    const solversOptions = getSolvers().map((solver, index) => (
        <IonSelectOption key={`solver-${index}`} value={solver.value}>
            {solver.name}
        </IonSelectOption>
    ));

    const executorsOptions = getExecutors().map((executor, index) => (
        <IonSelectOption key={`executor-${index}`} value={executor.value}>
            {executor.name}
        </IonSelectOption>
    ));

    return (
        <IonRow>
            <IonCol size="12">
                <IonList>
                    <IonListHeader>
                        <IonLabel>Language, Solver and Executor</IonLabel>
                    </IonListHeader>
                    <IonItem>
                        <IonLabel> Language </IonLabel>
                        <IonSelect
                            value={currentLanguage}
                            onIonChange={selectLanguage}
                        >
                            {languagesOptions}
                        </IonSelect>
                    </IonItem>

                    <IonItem>
                        <IonLabel> Solver </IonLabel>
                        <IonSelect
                            value={currentSolver}
                            onIonChange={selectSolver}
                        >
                            {solversOptions}
                        </IonSelect>
                    </IonItem>

                    <IonItem>
                        <IonLabel> Executor </IonLabel>
                        <IonSelect
                            value={currentExecutor}
                            onIonChange={selectExecutor}
                        >
                            {executorsOptions}
                        </IonSelect>
                    </IonItem>
                </IonList>

                {getOptions().length > 0 && (
                    <>
                        <IonListHeader>
                            <IonLabel>Options</IonLabel>
                        </IonListHeader>
                        {currentOptions.map((option) => (
                            <Option
                                key={`solver-option-${option.id}`}
                                optionsAvailable={getOptions()}
                                optionData={option}
                                onChangeOptionType={onChangeOptionType}
                                onChangeOptionValues={onChangeOptionValues}
                                onDeleteOption={onDeleteOption}
                            />
                        ))}
                        <IonButton
                            className="ion-padding-start ion-padding-end"
                            expand="block"
                            onClick={addOption}
                        >
                            <IonIcon icon={addOutline} />
                            Add Option
                        </IonButton>
                    </>
                )}

                <TabToExecute
                    tabs={editorTabs}
                    tabsIDToExecute={tabsIDToExecute}
                    onCheckCurrentTab={onCheckCurrentTab}
                    onCheckTab={onCheckTab}
                />
            </IonCol>
        </IonRow>
    );
};

export default RunSettings;
