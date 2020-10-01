import { Store } from "pullstate";
import { ILanguagesStore, ILoideTab, IEditorStore, IRunSettingsStore, IOutputStore } from "./LoideInterfaces";
import { enableMapSet } from "immer";

enableMapSet();

export const LanguagesDataStore = new Store<ILanguagesStore>({
  languages: []
});

export const RunSettingsStore = new Store<IRunSettingsStore>({
  currentLanguage: "",
  currentSolver: "",
  currentExecutor: "",

  currentOptions: [],

  tabsIDToExecute: []
});

export const EditorStore = new Store<IEditorStore>({
  prevTabsSize: 0,
  currentTab: 0,
  tabs: new Map<number, ILoideTab>()
});

export const OutputStore = new Store<IOutputStore>({
  model: "",
  error: ""
})