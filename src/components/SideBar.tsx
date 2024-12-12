import Image from "next/image";
import Link from "next/link";
import {
  IconAbout,
  IconClose,
  IconContact,
  IconHome,
  IconService,
} from "./Icons";
import cn from "@/app/lib/cn";
import { cloneElement } from "react";

export default function SideBar({
  OnClose,
  isVisible,
  changeVisibility,
}: {
  OnClose?: () => void;
  isVisible: boolean;
  changeVisibility: (state: boolean) => void;
}) {
  function handleClose() {
    changeVisibility(false);

    if (OnClose) {
      OnClose();
    }
  }

  return (
    <div
      className={cn(
        "w-full h-dvh   bg-gray-50/5 backdrop-blur-[2px] fixed top-0 right-0 z-10 hidden",
        {
          block: isVisible,
        }
      )}
      onClick={handleClose}
    >
      <div className="w-full h-dvh    flex justify-end items-center">
        <div className="w-[21.5rem] h-full overflow-auto dark:bg-gray-950 bg-slate-300 rounded-s-lg ">
          {/* top sec0 */}

          <div className="flex flex-row items-center py-2 px-6  justify-between border-b-[1px] border-sky-500">
            {/* logo */}
            <div className="flex flex-row justify-start items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image src="/myself.jpg" alt="logo" width={100} height={100} />
              </div>
              <p className="text-md font-bold pl-3 dark:text-gray-100">
                Lorem ipsm
              </p>
            </div>

            {/* Action button  */}
            <div
              className="flex justify-end items-center p-2 dark:hover:bg-gray-50/5 hover:bg-gray-400 rounded-full cursor-pointer"
              onClick={handleClose}
            >
              <IconClose className="size-6 text-sky-600" />
            </div>
          </div>

          {/* Navigation  */}
          <div className="w-full h-fit overflow-scroll">
            <div className="py-5 border-b-[1px] border-gray-500 ">
              <div className="w-full h-fit px-6  flex flex-col gap-3">
                <NavItem name="Home" icon={<IconHome />} href="/" />
                <NavItem name="About" icon={<IconAbout />} href="/about" />
                <NavItem
                  name="Services"
                  icon={<IconService />}
                  href="/service"
                />
                <NavItem
                  name="Contact"
                  icon={<IconContact />}
                  href="/contact"
                />
              </div>
            </div>

            {/* Unsinged user */}

            <UnsignedUser />
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({
  name,
  icon,
  href,
}: {
  name: string;
  icon: React.ReactNode;
  href?: string;
}) {
  const Icon = cloneElement(
    icon as React.ReactElement,
    {
      className:
        "size-5 dark:text-gray-400 dark:group-hover:text-sky-500 group-hover:text-sky-500",
    } as { className: string }
  );
  return (
    <div className="mt-2 ">
      <Link
        href={href || "#"}
        className=" group flex flex-row justify-start items-center  rounded-md py-[0.2rem] pl-2 dark:hover:bg-gray-50/5 hover:ring-1 hover:bg-gray-800 hover:text-gray-50 "
      >
        <div className="size-8 rounded-full grid place-items-center">
          {Icon}
        </div>

        <h3 className="text-md font-semibold pl-2 ">{name}</h3>
      </Link>
    </div>
  );
}

function UnsignedUser() {
  return (
    <div className="py-5 ">
      <div className="flex flex-row justify-around items-end pt-10 ">
        <Link href="/login">
          <button className="w-32 h-12 rounded-sm grid place-items-center  bg-gray-900 dark:text-gray-400 text-gray-100 hover:text-sky-500 dark:hover:text-sky-500 text-lg font-semibold hover:underline">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="w-32 h-12 rounded-sm grid place-items-center  bg-gray-900 dark:text-gray-400 text-gray-100 hover:text-sky-500 dark:hover:text-sky-500 text-lg font-semibold hover:underline">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
}
