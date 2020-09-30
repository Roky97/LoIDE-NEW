import { Store } from "pullstate";

import { enableMapSet } from "immer";
enableMapSet();

import { ILanguagesStore, ILoideTab, IEditorStore, IRunSettingsStore } from "./ts/LoideInterfaces";

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