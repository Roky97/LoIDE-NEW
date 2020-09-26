import { ILanguageData } from "./LoideAPIInterfaces";

export interface ISolverOption {
    id: number;
    name: string;
    values: string[];
}

export interface ModalProps {
    show: boolean;
    onHide: () => void;
}

export interface IToggleItem {
    toggle: (newStatus: boolean) => void;
    show: boolean;
}

export interface ILanguagesStore {
    languages: ILanguageData[]
}

export interface IRunSettingsStore {
    currentLanguage: string,
    currentSolver: string,
    currentExecutor: string,

    currentOptions: ISolverOption[]
}

export interface ILoideTab {
    title: string;
    type: string;
    value: string;
}

export interface IUserOperationsStore {
    deletingTab: boolean;
}

export interface IEditorStore {
    currentTab: number;
    tabs: Map<number, ILoideTab>
}