// LoIDE Web Server API URL
export const APIUrl = "localhost:8084";

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
    RunConnectError: "Falied to run the project. Maybe the server or you are offline. \n Try it later.",
    GetLanguagesError: "Falied to get the languages. Maybe the server or you are offline. \n I'm trying to reconnect."
}

export const WindowConfirmMessages = {
    DeleteTab: "Are you sure you want to delete this tab? This cannot be undone."
}

export const LoideLanguages = {
    ASP: "asp"
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

export const LoideVersion = "0.1.0 beta"