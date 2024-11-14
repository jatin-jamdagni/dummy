"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const ThemeMode = () => {
  const { setTheme } = useTheme();

  const [themeMode, setThemeMode] = React.useState<string>("system");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setThemeMode(storedTheme);
      }
    }
  }, []);



  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setTheme(themeMode);
      localStorage.setItem("theme", themeMode);
    }
  }, [setTheme, themeMode]);

  return (
    <Button
      size="icon"
      className={`text-white bg-transparent hover:bg-transparent active:bg-transparent ${
        themeMode === "light" ? "text-black" : "text-white"
      }`}
      onClick={() => setThemeMode(themeMode === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeMode;
