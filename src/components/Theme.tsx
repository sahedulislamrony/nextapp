"use client";

import cn from "@/app/lib/cn";
import { IconLight, IconStar, IconSystem } from "@/components/Icons";
import { useEffect, useState } from "react";

export default function Theme() {
  const [theme, setTheme] = useState<string>("system");
  const [themePanel, setThemePanel] = useState(false);

  // Load theme from localStorage when the component mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);
  }, []);

  // Apply theme to the document root and save it in localStorage
  useEffect(() => {
    if (!theme) return;

    const root = document.documentElement;

    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", isDark);
    } else {
      root.classList.toggle("dark", theme === "dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div
      className="px-2 pl-5 relative"
      onClick={() => setThemePanel((prev) => !prev)}
    >
      <div className="w-full h-full text-sky-500 p-2 rounded-full dark:hover:bg-gray-50/10   lg:bg-gray-300 hover:bg-gray-300 dark:lg:bg-gray-50/10 cursor-pointer">
        <IconLight />
      </div>

      {/* Theme switcher */}
      {themePanel && (
        <div className="w-32 py-1 absolute top-[4.3rem] overflow-hidden -left-[40%] rounded-md bg-gray-700 dark:bg-gray-50/5 shadow-sm shadow-gray-50/10">
          <ThemeOption
            text="Light"
            onClick={() => setTheme("light")}
            active={theme === "light"}
            icon={<IconLight />}
          />

          <ThemeOption
            text="Dark"
            active={theme === "dark"}
            onClick={() => setTheme("dark")}
            icon={<IconStar className="size-5" />}
          />

          <ThemeOption
            text="System"
            onClick={() => setTheme("system")}
            active={theme === "system"}
            icon={<IconSystem className="size-5" />}
          />
        </div>
      )}
    </div>
  );
}

function ThemeOption({
  text,
  active,
  onClick,
  icon,
}: {
  text: string;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="w-32 h-8 text-sm flex flex-row justify-start items-center hover:bg-gray-400/10 cursor-pointer"
      onClick={onClick}
    >
      <div className="pl-1">
        <div
          className={cn(
            "h-full p-2 rounded-full text-gray-50 dark:text-gray-300",
            {
              "text-sky-500 dark:text-sky-500": active,
            }
          )}
        >
          {icon}
        </div>
      </div>
      <h4 className="font-semibold pl-1 text-gray-50 dark:text-gray-300">
        {text}
      </h4>
    </div>
  );
}
