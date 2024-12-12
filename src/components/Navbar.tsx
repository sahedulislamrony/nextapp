"use client";

import Image from "next/image";
import { IconMenu, IconNotification } from "@/components/Icons";
import Link from "next/link";
import Theme from "@/components/Theme";
import { useState } from "react";
import SideBar from "./SideBar";

export default function Navbar() {
  const user: boolean = false;
  const [sidebarSatus, setSidebarStatus] = useState(false);

  return (
    <>
      <nav className="w-full flex flex-row h-16 sidePadding fixed top-0 right-0 bg-gray-50/5   backdrop-blur-md border-b-[1px] border-sky-500 ">
        {/* left  sec */}
        <div className="w-[40rem] flex justify-start  items-center ">
          <Link href="/" className="flex justify-start gap-3  items-center">
            <div className="w-10 h-10 rounded-full object-center overflow-hidden object-cover cursor-pointer">
              <Image src="/myself.jpg" alt="logo" width={100} height={100} />
            </div>
            <h2 className="font-semibold text-lg md:text-2xl sm:text-xl cursor-pointer  text-gray-950  hover:text-sky-600 center dark:text-slate-100 dark:hover:text-sky-600 ">
              Logo text
            </h2>
          </Link>
        </div>

        {/* mid  sec */}
        <div className="w-full">
          <ul className="h-full bg-transparent  justify-end items-center gap-0 pr-7 font-semibold text-gray-950 text-base hidden lg:flex">
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
            {/* Theme components */}
            <Theme />
            {!user && <UnsignedUser />}
            {user && <SignedUser />}

            {/* side bar toggler button */}
            <div
              className=" text-sky-500 p-2 ml-2 rounded-full bg-gray-300 dark:bg-gray-50/10 cursor-pointer lg:hidden"
              onClick={() => setSidebarStatus(true)}
            >
              <IconMenu />
            </div>
          </div>
        </div>
      </nav>

      {/* space */}
      <div className="w-full h-16"></div>
      {/* Side bar */}

      <SideBar isVisible={sidebarSatus} changeVisibility={setSidebarStatus} />
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
    <div className="w-full h-full  justify-end items-center   hidden lg:flex">
      <Link href="/login">
        <button className="px-6 py-2 font-semibold text-base  hover:text-sky-600 hover:underline ">
          Login
        </button>
      </Link>
      <Link href="/signup">
        <button className="px-6 py-2 font-semibold border-2 border-sky-400 text-base rounded-[3px] hover:bg-sky-400 hover:text-gray-700 dark:border-sky-600 dark:hover:bg-sky-600 dark:hover:text-gray-950">
          Signup
        </button>
      </Link>
    </div>
  );
}

function SignedUser() {
  return (
    <div className="h-full  flex-row justify-end items-center gap-2 hidden lg:flex">
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
