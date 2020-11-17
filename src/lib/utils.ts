import {
    IExecutorData,
    ILanguageData,
    IOptionsData,
    ISolverData,
} from "./LoideAPIInterfaces";
import { toastController } from "@ionic/core";
import { ILoideProject, ILoideTab, ISolverOption } from "./LoideInterfaces";
import {
    EditorStore,
    initialEditorStore,
    initialOutputStore,
    initialRunSettingsStore,
    initialUIStatusStore,
    OutputStore,
    RunSettingsStore,
    UIStatusStore,
} from "./store";
import { enableMapSet } from "immer";
import {
    InitalTabCountID,
    SuffixNameTab,
    Toast,
    ValuesNotSupported,
} from "./constants";

enableMapSet();

const isJSON = (str: string) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

const hasRightProperty = (config: any): boolean => {
    if (
        "language" in config &&
        "solver" in config &&
        "executor" in config &&
        "options" in config &&
        "IDTabsToExecute" in config &&
        "tabs" in config &&
        "IDTabs" in config &&
        "runAuto" in config &&
        "outputModel" in config &&
        "outputError" in config
    ) {
        return true;
    }

    return false;
};

const generateGeneralToast = async (
    message: string,
    headerMessage: string,
    color: string,
    duration?: number
) => {
    await toastController
        .create({
            position: "top",
            header: headerMessage,
            message: message,
            color: color,
            duration: duration !== undefined ? duration : 3000,
            buttons: ["OK"],
        })
        .then((toast) => {
            toast.present();
        });
};

const canSetLanguage = (
    language: string,
    languages: ILanguageData[]
): boolean => {
    let found: boolean = languages.some((lang) => {
        return lang.value === language;
    });

    return found;
};

const getExecutorsBySolversAndByLanguage = (
    solver: string,
    language: string,
    languages: ILanguageData[]
): IExecutorData[] => {
    let solvers: ISolverData[] = getSolversByLanguage(language, languages);

    for (let sol of solvers) {
        if (sol.value === solver) {
            return sol.executors;
        }
    }

    return new Array<IExecutorData>();
};

const getOptionsAvaliabeBySolverAndByLanguage = (
    solver: string,
    language: string,
    languages: ILanguageData[]
): IOptionsData[] => {
    let solvers: ISolverData[] = getSolversByLanguage(language, languages);

    for (let sol of solvers) {
        if (sol.value === solver) {
            if (sol.options) return sol.options;
            else {
                return new Array<IOptionsData>();
            }
        }
    }

    return new Array<IOptionsData>();
};

const getSolversByLanguage = (
    language: string,
    languages: ILanguageData[]
): ISolverData[] => {
    for (let lang of languages) {
        if (lang.value === language) {
            return lang.solvers;
        }
    }
    return new Array<ISolverData>();
};

const canSetSolver = (
    solverToFind: string,
    language: string,
    totalLanguages: ILanguageData[]
): boolean => {
    let solvers: ISolverData[] = getSolversByLanguage(language, totalLanguages);

    if (solvers.length === 0) return false;

    let found: boolean = solvers.some((sol) => {
        return sol.value === solverToFind;
    });

    return found;
};

const canSetExecutor = (
    executorToFind: string,
    solver: string,
    language: string,
    totalLanguages: ILanguageData[]
): boolean => {
    let executors: IExecutorData[] = getExecutorsBySolversAndByLanguage(
        solver,
        language,
        totalLanguages
    );

    if (executors.length === 0) return false;

    for (let exe of executors) {
        if (exe.value === executorToFind) return true;
    }

    return false;
};

const canSetOption = (
    option: ISolverOption,
    solver: string,
    language: string,
    totalLanguages: ILanguageData[]
): boolean => {
    let optionsAvailable = getOptionsAvaliabeBySolverAndByLanguage(
        solver,
        language,
        totalLanguages
    );

    for (let opt of optionsAvailable) {
        if (opt.value === option.name) return true;
    }

    return false;
};

const getPropName = (obj: any) =>
    new Proxy(obj, {
        get(_, key) {
            return key;
        },
    });

const copyStringToClipboard = (str: string) => {
    // Create new element
    var el = document.createElement("textarea");
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute("readonly", "");
    // el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand("copy");
    // Remove temporary element
    document.body.removeChild(el);
};

const isClipboardReadSupported = (): boolean => {
    try {
        return typeof navigator?.clipboard?.readText === "undefined"
            ? false
            : true;
    } catch (error) {
        return false;
    }
};

const isClipboardWriteSupported = (): boolean => {
    try {
        return typeof navigator?.clipboard?.writeText === "undefined"
            ? false
            : true;
    } catch (error) {
        return false;
    }
};

const getTextFromClipboard = (callback: (text: string) => void): void => {
    if (isClipboardReadSupported()) {
        navigator.clipboard
            .readText()
            .then((text) => {
                callback(text);
            })
            .catch((err) => {
                // error because maybe the user didn't grant access to read from clipboard
                Utils.generateGeneralToast(
                    "Clipboard read error, maybe you didn't grant the access to read from the clipboard",
                    "Clipboard error",
                    "danger"
                );
                console.error(err);
            });
    } else
        Utils.generateGeneralToast(
            "Clipboard not supported",
            "Clipboard error",
            "danger"
        );
};

const copyTextToClipboard = (
    text: string,
    callbackSuccess?: () => void,
    callbackError?: () => void
) => {
    if (isClipboardWriteSupported()) {
        navigator.clipboard
            .writeText(text)
            .then(callbackSuccess, callbackError);
    }
};

const downloadTextFile = (title: string, text: string) => {
    const element = document.createElement("a");
    const file = new Blob([text], {
        type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = title;
    document.body.appendChild(element);
    element.click();
};

const resetInput = () => {
    EditorStore.update((e) => {
        e.tabs = initialEditorStore.tabs;
        e.currentTab = initialEditorStore.currentTab;
        e.tabCountID = initialEditorStore.tabCountID;
        e.prevTabsSize = initialEditorStore.prevTabsSize;
    });
};

const addTab = () => {
    EditorStore.update((e) => {
        let nextID = e.tabCountID + 1;

        let nextTabs = new Map(e.tabs);
        nextTabs.set(nextID, {
            title: `${SuffixNameTab}${nextID}`,
            type: "",
            value: "",
        });

        e.currentTab = nextTabs.size - 1;
        e.prevTabsSize = e.tabs.size;
        e.tabs = nextTabs;
        e.tabCountID = nextID;
    });
};

const deleteTab = (tabKey: number) => {
    EditorStore.update((e) => {
        let nextTabs = new Map(e.tabs);
        nextTabs.delete(tabKey);
        let shift = e.tabs.size - 1 === e.currentTab ? true : false;

        e.currentTab = shift ? e.currentTab - 1 : e.currentTab;
        e.tabs = nextTabs;
        e.prevTabsSize = e.tabs.size;
    });
};

const selectTab = (index: number) => {
    EditorStore.update((e) => {
        e.currentTab = index;
    });
};

const changeTabValue = (tabKey: number, value: string) => {
    EditorStore.update((e) => {
        let tab: ILoideTab = Object.assign({}, e.tabs.get(tabKey));

        if (tab) {
            tab.value = value;

            let nextTabs = new Map(e.tabs);
            nextTabs.set(tabKey, tab);

            e.tabs = nextTabs;
        }
    });
};

const resetProject = () => {
    RunSettingsStore.update((s) => {
        s.currentLanguage = initialRunSettingsStore.currentLanguage;
        s.currentSolver = initialRunSettingsStore.currentSolver;
        s.currentExecutor = initialRunSettingsStore.currentExecutor;
        s.currentOptions = initialRunSettingsStore.currentOptions;
        s.runAuto = initialRunSettingsStore.runAuto;
        s.IDTabsToExecute = initialRunSettingsStore.IDTabsToExecute;
    });

    Utils.Editor.resetInput();

    OutputStore.update((o) => {
        o.error = initialOutputStore.error;
        o.model = initialOutputStore.model;
    });
};

const createTabsFromArray = (textTabs: string[]) => {
    let newTabs = new Map<number, ILoideTab>();
    let indexTab = InitalTabCountID;
    textTabs.forEach((text) => {
        newTabs.set(indexTab, {
            title: `${SuffixNameTab}${indexTab}`,
            type: "",
            value: text,
        });
        indexTab++;
    });
    EditorStore.update((e) => {
        e.tabCountID = indexTab;
        e.tabs = newTabs;
    });
    UIStatusStore.update((u) => {
        u.loadingFiles = false;
    });
    Utils.generateGeneralToast(
        Toast.FileOpenedSuccessfully.message,
        Toast.FileOpenedSuccessfully.header,
        "success"
    );
};

const setProjectFromConfig = (
    config: any,
    languages: ILanguageData[],
    onFinishCallback?: (done: boolean) => void
) => {
    if (Utils.hasRightProperty(config)) {
        let project: ILoideProject = config;

        let valuesNotSupported: string[] = [];
        let optionsSupported: ISolverOption[] = [];
        let optionsNotSupported: boolean = false;

        // set the current language
        if (Utils.canSetLanguage(project.language, languages)) {
            RunSettingsStore.update((s) => {
                s.currentLanguage = project.language;
            });

            // set the current solver
            if (
                Utils.canSetSolver(project.solver, project.language, languages)
            ) {
                RunSettingsStore.update((s) => {
                    s.currentSolver = project.solver;
                });

                // set the current executor
                if (
                    Utils.canSetExecutor(
                        project.executor,
                        project.solver,
                        project.language,
                        languages
                    )
                ) {
                    RunSettingsStore.update((s) => {
                        s.currentExecutor = project.executor;
                    });
                } else {
                    valuesNotSupported.push(ValuesNotSupported.Executor);
                }
            } else {
                valuesNotSupported.push(ValuesNotSupported.Solver);
                valuesNotSupported.push(ValuesNotSupported.Executor);
            }
        } else {
            valuesNotSupported.push(ValuesNotSupported.Language);
            valuesNotSupported.push(ValuesNotSupported.Solver);
            valuesNotSupported.push(ValuesNotSupported.Executor);
        }

        for (let option of project.options) {
            if (
                Utils.canSetOption(
                    option,
                    project.solver,
                    project.language,
                    languages
                )
            )
                optionsSupported.push(option);
            else optionsNotSupported = true;
        }

        // set the ID tabs to execute, the options supported and the runAuto option
        RunSettingsStore.update((s) => {
            s.currentOptions = optionsSupported;
            s.IDTabsToExecute = project.IDTabsToExecute;
            s.runAuto = project.runAuto;
        });

        // set the tabs and their IDs
        let newTabs = new Map<number, ILoideTab>();

        project.tabs.forEach((program, index) => {
            newTabs.set(project.IDTabs[index], {
                title: program.title,
                type: program.type,
                value: program.value,
            });
        });

        EditorStore.update((e) => {
            e.tabs = newTabs;
            e.tabCountID = project.IDTabs[project.IDTabs.length - 1]; // set the last ID
        });

        // set the output
        OutputStore.update((o) => {
            o.model = project.outputModel;
            o.error = project.outputError;
        });

        if (valuesNotSupported.length > 0) {
            Utils.generateGeneralToast(
                `${
                    Toast.FileNotOpenedProperly.message
                        .TheFollowingValuesCannotBeSetted
                }\n<b>${valuesNotSupported.join(",\n")}\n${
                    optionsNotSupported
                        ? `<br>${Toast.FileNotOpenedProperly.message.FoundSolverOptions}`
                        : ""
                } <b/>`,
                Toast.FileNotOpenedProperly.header,
                "warning",
                10000
            );

            if (onFinishCallback) onFinishCallback(true);
        } else if (optionsNotSupported) {
            Utils.generateGeneralToast(
                Toast.FileNotOpenedProperly.message
                    .FoundSolverOptionsIncompatibilitySolverLoaded,
                Toast.FileNotOpenedProperly.header,
                "warning",
                7000
            );
            if (onFinishCallback) onFinishCallback(true);
        } else {
            Utils.generateGeneralToast(
                Toast.FileOpenedSuccessfully.message,
                Toast.FileOpenedSuccessfully.header,
                "success"
            );
            if (onFinishCallback) onFinishCallback(true);
        }
    } else {
        Utils.generateGeneralToast(
            Toast.ConfigFileNotRecognized.message,
            Toast.ConfigFileNotRecognized.header,
            "danger"
        );
        if (onFinishCallback) onFinishCallback(false);
    }
    UIStatusStore.update((u) => {
        u.loadingFiles = false;
    });
};

const setProjectFromLink = (
    config: any,
    languages: ILanguageData[],
    onFinishCallback?: (done: boolean) => void
) => {
    if (Utils.hasRightProperty(config)) {
        let project: ILoideProject = config;

        let valuesNotSupported: string[] = [];
        let optionsSupported: ISolverOption[] = [];
        let optionsNotSupported: boolean = false;

        // set the current language
        if (Utils.canSetLanguage(project.language, languages)) {
            RunSettingsStore.update((s) => {
                s.currentLanguage = project.language;
            });

            // set the current solver
            if (
                Utils.canSetSolver(project.solver, project.language, languages)
            ) {
                RunSettingsStore.update((s) => {
                    s.currentSolver = project.solver;
                });

                // set the current executor
                if (
                    Utils.canSetExecutor(
                        project.executor,
                        project.solver,
                        project.language,
                        languages
                    )
                ) {
                    RunSettingsStore.update((s) => {
                        s.currentExecutor = project.executor;
                    });
                } else {
                    valuesNotSupported.push(ValuesNotSupported.Executor);
                }
            } else {
                valuesNotSupported.push(ValuesNotSupported.Solver);
                valuesNotSupported.push(ValuesNotSupported.Executor);
            }
        } else {
            valuesNotSupported.push(ValuesNotSupported.Language);
            valuesNotSupported.push(ValuesNotSupported.Solver);
            valuesNotSupported.push(ValuesNotSupported.Executor);
        }

        for (let option of project.options) {
            if (
                Utils.canSetOption(
                    option,
                    project.solver,
                    project.language,
                    languages
                )
            )
                optionsSupported.push(option);
            else optionsNotSupported = true;
        }

        // set the ID tabs to execute, the options supported and the runAuto option
        RunSettingsStore.update((s) => {
            s.currentOptions = optionsSupported;
            s.IDTabsToExecute = project.IDTabsToExecute;
            s.runAuto = project.runAuto;
        });

        // set the tabs and their IDs
        let newTabs = new Map<number, ILoideTab>();

        project.tabs.forEach((program, index) => {
            newTabs.set(project.IDTabs[index], {
                title: program.title,
                type: program.type,
                value: program.value,
            });
        });

        EditorStore.update((e) => {
            e.tabs = newTabs;
            e.tabCountID = project.IDTabs[project.IDTabs.length - 1]; // set the last ID
        });

        // set the output
        OutputStore.update((o) => {
            o.model = project.outputModel;
            o.error = project.outputError;
        });

        if (valuesNotSupported.length > 0) {
            Utils.generateGeneralToast(
                `${
                    Toast.FileNotOpenedProperly.message
                        .TheFollowingValuesCannotBeSetted
                }\n<b>${valuesNotSupported.join(",\n")}${
                    optionsNotSupported
                        ? `<br>${Toast.FileNotOpenedProperly.message.FoundSolverOptions}`
                        : ""
                } <b/>`,
                Toast.FileNotOpenedProperly.header,
                "warning",
                10000
            );

            if (onFinishCallback) onFinishCallback(true);
        } else if (optionsNotSupported) {
            Utils.generateGeneralToast(
                Toast.FileNotOpenedProperly.message
                    .FoundSolverOptionsIncompatibilitySolverLoaded,
                Toast.ProjectNotOpenedProperly.header,
                "warning",
                7000
            );
            if (onFinishCallback) onFinishCallback(true);
        } else {
            Utils.generateGeneralToast(
                "",
                Toast.ProjectOpenedSuccessfully.header,
                "success"
            );
            if (onFinishCallback) onFinishCallback(true);
        }
    } else {
        Utils.generateGeneralToast(
            Toast.LinkFileNotRecognized.message,
            Toast.LinkFileNotRecognized.header,
            "danger"
        );
        if (onFinishCallback) onFinishCallback(false);
    }
    UIStatusStore.update((u) => {
        u.loadingFiles = false;
    });
};

const resetAppearanceOptions = () => {
    UIStatusStore.update((u) => {
        u.fontSizeEditor = initialUIStatusStore.fontSizeEditor;
        u.fontSizeOutput = initialUIStatusStore.fontSizeOutput;
        u.darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    });
};

const Editor = {
    resetInput,
    addTab,
    deleteTab,
    selectTab,
    changeTabValue,
};

const Utils = {
    Editor,
    isJSON,
    hasRightProperty,
    canSetLanguage,
    generateGeneralToast,
    getPropName,
    canSetSolver,
    canSetExecutor,
    canSetOption,
    isClipboardReadSupported,
    isClipboardWriteSupported,
    getTextFromClipboard,
    downloadTextFile,
    resetProject,
    copyTextToClipboard,
    createTabsFromArray,
    setProjectFromConfig,
    setProjectFromLink,
    resetAppearanceOptions,
};

export default Utils;
