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
            Utils.setProjectFromConfig(config, languages, props.onFinishLoad);
        },
        [props, languages]
    );

    const setTabsFromFiles = useCallback(
        (textsTabs: string[]) => {
            Utils.createTabsFromArray(textsTabs);
            if (props.onFinishLoad) props.onFinishLoad(true);
        },
        [props]
    );

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
