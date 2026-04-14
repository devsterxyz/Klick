import { useTheme } from "./ThemeContext.js";

export function useThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return {
    theme,
    isDark,
    label: isDark ? "Light" : "Dark",
    toggleTheme,
    buttonProps: {
      type: "button",
      onClick: toggleTheme,
      "aria-label": `Switch to ${isDark ? "light" : "dark"} mode`,
      title: `Switch to ${isDark ? "light" : "dark"} mode`,
    },
  };
}
