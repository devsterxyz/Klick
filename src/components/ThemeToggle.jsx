import { useTheme } from "./ThemeContext.jsx";

export default function ThemeToggle({ children }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <button onClick={toggleTheme} className="p-2 border">
        {theme === "light" ? "Dark" : "Light"}
      </button>
      {children}
    </>
  );
}
