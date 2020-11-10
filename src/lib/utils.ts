import { IExecutorData, ILanguageData, IOptionsData, ISolverData } from "./LoideAPIInterfaces";
import { toastController } from "@ionic/core";
import { ISolverOption } from "./LoideInterfaces";

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
}

const generateGeneralToast = async (message: string, headerMessage: string, color: string, duration?: number) => {
    await toastController.create({
        position: "top",
        header: headerMessage,
        message: message,
        color: color,
        duration: duration !== undefined ? duration : 3000,
        buttons: ["OK"]
    })
        .then(toast => {
            toast.present()
        });
}

const canSetLanguage = (language: string, languages: ILanguageData[]): boolean => {

    let found: boolean = languages.some(lang => {
        return lang.value === language
    })

    return found;
}

const getExecutorsBySolversAndByLanguage = (solver: string, language: string, languages: ILanguageData[]): IExecutorData[] => {
    let solvers: ISolverData[] = getSolversByLanguage(language, languages);

    for (let sol of solvers) {
        if (sol.value === solver) {
            return sol.executors;
        }
    }

    return new Array<IExecutorData>();
};

const getOptionsAvaliabeBySolverAndByLanguage = (solver: string, language: string, languages: ILanguageData[]): IOptionsData[] => {
    let solvers: ISolverData[] = getSolversByLanguage(language, languages);

    for (let sol of solvers) {
        if (sol.value === solver) {
            if (sol.options)
                return sol.options;
            else {
                return new Array<IOptionsData>();
            }
        }
    }

    return new Array<IOptionsData>();
};

const getSolversByLanguage = (language: string, languages: ILanguageData[]): ISolverData[] => {
    for (let lang of languages) {
        if (lang.value === language) {
            return lang.solvers;
        }
    }
    return new Array<ISolverData>();
};

const canSetSolver = (solverToFind: string, language: string, totalLanguages: ILanguageData[]): boolean => {

    let solvers: ISolverData[] = getSolversByLanguage(language, totalLanguages);

    if (solvers.length === 0) return false;

    let found: boolean = solvers.some(sol => {
        return sol.value === solverToFind
    })

    return found;

}

const canSetExecutor = (executorToFind: string, solver: string, language: string, totalLanguages: ILanguageData[]): boolean => {

    let executors: IExecutorData[] = getExecutorsBySolversAndByLanguage(solver, language, totalLanguages);

    if (executors.length === 0) return false;

    for (let exe of executors) {
        if (exe.value === executorToFind) return true
    }

    return false;
}

const canSetOption = (option: ISolverOption, solver: string, language: string, totalLanguages: ILanguageData[]): boolean => {
    let optionsAvailable = getOptionsAvaliabeBySolverAndByLanguage(solver, language, totalLanguages)

    for (let opt of optionsAvailable) {
        if (opt.value === option.name) return true;
    }

    return false;
}

const getPropName = (obj: any) => new Proxy(obj, {
    get(_, key) {
        return key;
    }
});

const copyStringToClipboard = (str: string) => {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    // el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
}

const isClipboardSupported = (): boolean => {
    return typeof (navigator.clipboard) === 'undefined' ? false : true;
}

const getTextFromClipboard = (callback: (text: string) => void): void => {

    if (isClipboardSupported()) {
        navigator.clipboard
            .readText()
            .then((text) => {
                callback(text)
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
    }
    else
        Utils.generateGeneralToast(
            "Clipboard not supported",
            "Clipboard error",
            "danger"
        );
}

const downloadTextFile = (title: string, text: string) => {

    const element = document.createElement("a");
    const file = new Blob([text], {
        type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = title;
    document.body.appendChild(element);
    element.click();
}

const Utils = {
    isJSON,
    hasRightProperty,
    canSetLanguage,
    generateGeneralToast,
    getPropName,
    canSetSolver,
    canSetExecutor,
    canSetOption,
    copyStringToClipboard,
    isClipboardSupported,
    getTextFromClipboard,
    downloadTextFile
}

export default Utils;