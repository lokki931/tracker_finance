import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex justify-end mb-2">
      {theme === "light" ? (
        <Sun
          onClick={() => setTheme("dark")}
          className="h-[1.2rem] w-[1.2rem] cursor-pointer"
        />
      ) : (
        <Moon
          onClick={() => setTheme("light")}
          className="h-[1.2rem] w-[1.2rem] cursor-pointer"
        />
      )}
    </div>
  );
}
