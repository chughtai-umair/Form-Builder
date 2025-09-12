import { useTheme } from "@/hooks/use-theme";
import { useEffect } from "react";

export function ThemeProvider({ children }) {
  const { theme } = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.add("light");
    }
  }, [theme]);

  return children;
}
