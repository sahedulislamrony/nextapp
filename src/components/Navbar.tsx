"use client";

import Image from "next/image";
import {
  IconLight,
  IconNotification,
  IconStar,
  IconSystem,
} from "@/components/Icons";
import { JSX, useEffect, useState } from "react";
import cn from "@/app/lib/cn";

export default function Navbar() {
  const user: boolean = false;

  return (
    <>
      <nav className="w-full flex flex-row h-16  px-20 fixed top-0 right-0 bg-gray-50/5   backdrop-blur-md border-b-[1px] border-sky-500 ">
        {/* left  sec */}
        <div className="w-[40rem]  flex justify-start gap-4  items-center">
          <div className="w-10 h-10 rounded-full object-center overflow-hidden object-cover cursor-pointer">
            <Image src="/myself.jpg" alt="logo" width={100} height={100} />
          </div>
          <h2 className="font-semibold text-2xl cursor-pointer  text-gray-950  hover:text-sky-600 center dark:text-slate-100 dark:hover:text-sky-600 ">
            Logo text
          </h2>
        </div>

        {/* mid  sec */}
        <div className="w-full">
          <ul className="h-full bg-transparent flex justify-end items-center gap-0 pr-7 font-semibold text-gray-950 text-base">
            <NavItem name="Home" />
            <NavItem name="About" />
            <NavItem name="Services" />
            <NavItem name="Contact" />
          </ul>
        </div>

        {/* right  sec */}
        <div className=" h-full ">
          <div className="h-full w-full flex justify-start items-center relative">
            {/* left bar */}
            <div className="w-[1px] h-[1.8rem] bg-gray-400 dark:bg-gray-500 absolute left-0 "></div>
            <Theme />
            {!user && <UnsignedUser />}
            {user && <SignedUser />}
          </div>
        </div>
      </nav>

      {/* space */}
      <div className="w-full h-16"></div>
    </>
  );
}

function NavItem({ name }: { name: string }) {
  return (
    <li className="px-5 py-2  hover:text-sky-600 cursor-pointer dark:text-slate-100 dark:hover:text-sky-600">
      {name}
    </li>
  );
}

function UnsignedUser() {
  return (
    <div className="w-full h-full flex justify-end items-center ">
      <button className="px-6 py-2 font-semibold text-base  hover:text-sky-600 hover:underline ">
        Login
      </button>
      <button className="px-6 py-2 font-semibold border-2 border-sky-400 text-base rounded-[3px] hover:bg-sky-400 hover:text-gray-700 dark:border-sky-600 dark:hover:bg-sky-600 dark:hover:text-gray-950">
        Signup
      </button>
    </div>
  );
}

function SignedUser() {
  return (
    <div className="h-full flex flex-row justify-end items-center gap-2 ">
      <div className="px-2 pl-5">
        <div className="h-full p-2 rounded-full hover:bg-gray-200/45 dark:hover:bg-gray-50/10   cursor-pointer">
          <IconNotification />
        </div>
      </div>
      <div className="w-8 h-8  rounded-full outline-double outline-sky-700">
        <div className="w-8 h-8 rounded-full object-center overflow-hidden object-cover cursor-pointer ">
          <Image src="/myself.jpg" alt="logo" width={100} height={100} />
        </div>
      </div>
    </div>
  );
}

function Theme() {
  const initialTheme = localStorage.getItem("theme") || "system";
  const [theme, setTheme] = useState(initialTheme);
  const [themePanel, setThemePanel] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", isDark);
    } else {
      root.classList.toggle("dark", theme === "dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);
  }, []);

  return (
    <div
      className="px-2 pl-5 relative"
      onClick={() => setThemePanel((prev) => !prev)}
    >
      <div className="w-full h-full text-sky-500 p-2 rounded-full bg-gray-200/45 dark:bg-gray-50/10 cursor-pointer">
        <IconLight />
      </div>

      {/* theme switcher */}

      {themePanel && (
        <div className="w-32 py-1 absolute top-[3.7rem] overflow-hidden  -left-[40%] rounded-md bg-gray-700 dark:bg-gray-50/5 shadow-sm shadow-gray-50/10">
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
  icon: JSX.Element;
}) {
  return (
    <div
      className="w-32 h-8 text-sm flex flex-row justify-start items-center hover:bg-gray-400/10 cursor-pointer "
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
