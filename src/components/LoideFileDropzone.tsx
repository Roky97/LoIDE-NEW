import React, { CSSProperties, useCallback, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { InitalTabCountID } from "../lib/constants";
import {
    ILoideProject,
    ILoideTab,
    ISolverOption,
} from "../lib/LoideInterfaces";
import {
    EditorStore,
    LanguagesDataStore,
    OutputStore,
    RunSettingsStore,
    UIStatusStore,
} from "../lib/store";
import Utils from "../lib/utils";

const baseStyle: CSSProperties = {
    flex: 1,
    cursor: "pointer",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
    justifyContent: "center",
};

const activeStyle = {
    borderColor: "#2196f3",
};

const acceptStyle = {
    borderColor: "#00e676",
};

const rejectStyle = {
    borderColor: "#ff1744",
};

interface LoideFileDropzoneProps {
    onFinishLoad?: (value: boolean) => void;
}

const LoideFileDropzone: React.FC<LoideFileDropzoneProps> = (props) => {
    const languages = LanguagesDataStore.useState((l) => l.languages);

    const setJSONInput = useCallback(
        (config: any) => {
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
                        Utils.canSetSolver(
                            project.solver,
                            project.language,
                            languages
                        )
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
                            valuesNotSupported.push("• Executor");
                        }
                    } else {
                        valuesNotSupported.push("• Solver");
                        valuesNotSupported.push("• Executor");
                    }
                } else {
                    valuesNotSupported.push("• Language");
                    valuesNotSupported.push("• Solver");
                    valuesNotSupported.push("• Executor");
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
                        `The following values cannot be setted:\n<b>${valuesNotSupported.join(
                            ",\n"
                        )}\n${
                            optionsNotSupported
                                ? "<br>Found solver options that cannot be setted due above."
                                : ""
                        } <b/>`,
                        "File not opened properly",
                        "warning",
                        10000
                    );

                    if (props.onFinishLoad) props.onFinishLoad(true);
                } else if (optionsNotSupported) {
                    Utils.generateGeneralToast(
                        "Found solver options that cannot be setted due the incompatibility of the solver loaded.",
                        "File not opened properly.",
                        "warning",
                        7000
                    );
                    if (props.onFinishLoad) props.onFinishLoad(true);
                } else {
                    Utils.generateGeneralToast(
                        "File opened successfully.",
                        "",
                        "success"
                    );
                    if (props.onFinishLoad) props.onFinishLoad(true);
                }
            } else {
                Utils.generateGeneralToast(
                    "Config file not recognized",
                    "Error open file",
                    "danger"
                );
                if (props.onFinishLoad) props.onFinishLoad(false);
            }
            UIStatusStore.update((u) => {
                u.loadingFiles = false;
            });
        },
        [props, languages]
    );

    const setTabsFromFiles = useCallback((textsTabs: string[]) => {
        let newTabs = new Map<number, ILoideTab>();
        let indexTab = InitalTabCountID;
        textsTabs.forEach((text) => {
            newTabs.set(indexTab, {
                title: `L P ${indexTab}`,
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
        Utils.generateGeneralToast("File opened successfully.", "", "success");
        if (props.onFinishLoad) props.onFinishLoad(true);
    }, []);

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({});

    useEffect(() => {
        if (acceptedFiles.length > 0) {
            UIStatusStore.update((u) => {
                u.loadingFiles = true;
            });

            let count = acceptedFiles.length;
            let textsTabs: string[] = [];
            if (acceptedFiles.length > 1) {
                acceptedFiles.forEach((file: any) => {
                    const reader = new FileReader();

                    reader.onabort = () => {
                        Utils.generateGeneralToast(
                            "File reading was aborted",
                            "Error open file",
                            "danger"
                        );
                    };
                    reader.onerror = () => {
                        Utils.generateGeneralToast(
                            "File reading has failed",
                            "Error open file",
                            "danger"
                        );
                    };
                    reader.onload = () => {
                        const text = reader.result;
                        if (text && typeof text === "string")
                            textsTabs.push(text);

                        if (!--count) setTabsFromFiles(textsTabs); // when done, invoke callback
                    };

                    reader.readAsText(file);
                });
            } else {
                let file = acceptedFiles[0];

                const reader = new FileReader();

                reader.onabort = () => {
                    Utils.generateGeneralToast(
                        "File reading was aborted",
                        "Error open file",
                        "danger"
                    );
                };
                reader.onerror = () => {
                    Utils.generateGeneralToast(
                        "File reading has failed",
                        "Error open file",
                        "danger"
                    );
                };
                reader.onload = () => {
                    const text = reader.result;
                    if (text && typeof text === "string") {
                        if (Utils.isJSON(text)) {
                            var jsontext = JSON.parse(text);
                            setJSONInput(jsontext);
                        } else {
                            setTabsFromFiles([text]);
                        }
                    }
                };
                reader.readAsText(file);
            }
        }
    }, [acceptedFiles, setJSONInput, setTabsFromFiles]);

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragActive, isDragReject, isDragAccept]
    );

    return (
        <div className="dropzone" {...getRootProps({ style: style })}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <>
                    {isDragReject && (
                        <p className="dropzone-text unselectable">
                            File not supported
                        </p>
                    )}
                    {isDragAccept && (
                        <p className="dropzone-text unselectable">
                            Drop the files here ...
                        </p>
                    )}
                </>
            ) : (
                <>
                    <span className="dropzone-text unselectable ion-text-center ion-margin-bottom">
                        Drag 'n' drop some files here, or click to select files.
                    </span>
                    <span className="ion-text-center">
                        If the file is a <i>.json</i> configuration file it will
                        set the configuration, otherwise it will show on text
                        editor.
                    </span>
                </>
            )}
        </div>
    );
};

export default LoideFileDropzone;
