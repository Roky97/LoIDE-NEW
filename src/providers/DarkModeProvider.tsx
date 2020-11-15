import React from "react";

export const darkModeContext = React.createContext(false);

export const DarkModeProvider: React.FC = ({ children }) => {
    const [darkMode, setDarkMode] = React.useState(
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );

    const handleDarkModeChange = (e: MediaQueryListEvent) => {
        setDarkMode(e.matches);
    };

    React.useEffect(() => {
        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", handleDarkModeChange);
        return () =>
            window
                .matchMedia("(prefers-color-scheme: dark)")
                .removeEventListener("change", handleDarkModeChange);
    }, []);

    return (
        <darkModeContext.Provider value={darkMode}>
            {children}
        </darkModeContext.Provider>
    );
};
