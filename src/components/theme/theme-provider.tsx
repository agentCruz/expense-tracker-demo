import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "dark" | "light" | "system";

interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}

interface ThemeProviderState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
}) => {
    const isBrowser = typeof window !== "undefined";
    const [theme, setTheme] = useState<Theme>(() => {
        if (!isBrowser) return defaultTheme;
        const storedTheme = localStorage.getItem(storageKey);
        return storedTheme === "dark" || storedTheme === "light" || storedTheme === "system"
            ? storedTheme
            : defaultTheme;
    });

    useEffect(() => {
        const root = window.document.documentElement;

        const applyTheme = (theme: Theme) => {
            root.classList.remove("light", "dark");
            if (theme === "system") {
                const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light";
                root.classList.add(systemTheme);
            } else {
                root.classList.add(theme);
            }
        };

        applyTheme(theme);

        if (theme === "system") {
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            const handleChange = () => applyTheme("system");
            mediaQuery.addEventListener("change", handleChange);
            return () => mediaQuery.removeEventListener("change", handleChange);
        }
    }, [theme]);

    const value = useMemo(
        () => ({
            theme,
            setTheme: (newTheme: Theme) => {
                localStorage.setItem(storageKey, newTheme);
                setTheme(newTheme);
            },
        }),
        [theme, storageKey]
    );

    return (
        <ThemeProviderContext.Provider value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
