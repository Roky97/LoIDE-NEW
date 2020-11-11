export const LoidePath = {
    Editor: "editor",
    RunSettings: "run-settings",
    Output: "output",
    About: "about"
};

export const APIWSEvents = {
    emit: {
        run: "run",
        getLanguages: "getLanguages"
    },
    on: {
        connectError: "connect_error",
        problem: "problem",
        output: "output",
        languages: "languages"
    }
}

export const Errors = {
    ConnectionError: "Unable to connect to the server, maybe you or the server are offline.\nTry it later.",
    RunConnectError: "Falied to run the project. Maybe the server or you are offline.\nTry it later.",
    GetLanguagesError: "Falied to get the languages. Maybe the server or you are offline.\nTry it later."
}

export const WindowConfirmMessages = {
    DeleteTab: { header: "Delete tab", message: "Are you sure want to delete this tab? This cannot be undone." },
    ResetInput: { header: "Reset input", message: "This operation will delete all the tabs. This cannot be undone." }
}

export const LoideLanguages = {
    ASP: { name: "asp", highlightSupport: true }
}

export const LoideSolvers = {
    DLV: "dlv",
    DLV2: "dlv2",
    Clingo: "clingo"
}

export const InitalTabCountID: number = 1

export const OutputPositions = {
    right: "right",
    bottom: "bottom",
    disabled: "disabled"
}
export const CurrentTab = 'current-tab';

export const screenBreakpoints = {
    extraSmall: 576,
    small: 768,
    medium: 992,
    large: 1200
}