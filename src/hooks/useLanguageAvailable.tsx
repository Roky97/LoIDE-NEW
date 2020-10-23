import { useEffect } from "react";
import { LanguagesDataStore, RunSettingsStore } from "../lib/store";

export const useLanguageAvailable = (): boolean => {
    const languages = LanguagesDataStore.useState((l) => l.languages);
    var available = languages.length > 0 ? true : false;

    useEffect(() => {
        available = languages.length > 0 ? true : false;
    }, [languages]);

    return available;
};
