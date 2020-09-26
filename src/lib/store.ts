import { Store } from "pullstate";

import { enableMapSet } from "immer";
enableMapSet();

import { ILanguagesStore, ILoideTab, IEditorStore, IRunSettingsStore, IUserOperationsStore } from "./ts/LoideInterfaces";

export const LanguagesDataStore = new Store<ILanguagesStore>({
  languages: []
});

export const RunSettingsStore = new Store<IRunSettingsStore>({
  currentLanguage: "",
  currentSolver: "",
  currentExecutor: "",

  currentOptions: []
});

export const UserOperationsStore = new Store<IUserOperationsStore>({
  deletingTab: false
})

export const EditorStore = new Store<IEditorStore>({
  currentTab: 0,
  tabs: new Map<number, ILoideTab>()
});