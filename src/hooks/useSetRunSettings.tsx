import { useEffect } from "react";
import { LanguagesDataStore, RunSettingsStore } from "../lib/store";

export const useSetRunSettings = () => {
    const languages = LanguagesDataStore.useState((l) => l.languages);

    useEffect(() => {
        console.log("lang", languages);
        if (languages.length > 0) {
            let firstLanguage = languages[0];

            RunSettingsStore.update((settings) => {
                settings.currentLanguage = firstLanguage.value;
            });
            RunSettingsStore.update((settings) => {
                settings.currentSolver = firstLanguage.solvers[0].value;
            });
            RunSettingsStore.update((settings) => {
                settings.currentExecutor =
                    firstLanguage.solvers[0].executors[0].value;
            });
        }
    }, [languages]);
};
