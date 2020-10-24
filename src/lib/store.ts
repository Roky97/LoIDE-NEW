import { Store } from "pullstate";
import { ILanguagesStore, ILoideTab, IEditorStore, IRunSettingsStore, IOutputStore, IUIStatusStore, ISocketStatusStore } from "./LoideInterfaces";

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

export const UIStatusStore = new Store<IUIStatusStore>({
  connectingToTheServer: false
})

export const SocketStatusStore = new Store<ISocketStatusStore>({
  connected: false
})