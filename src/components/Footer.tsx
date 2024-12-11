import { IconCopy } from "./Icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className=" bg-gray-300 text-gray-800   dark:bg-gray-900 dark:text-white w-full ">
      <div className="w-full py-4 flex flex-row justify-center items-center ">
        <IconCopy className="dark:text-gray-400 size-7" />{" "}
        <p className="text-md font-semibold pl-2 dark:text-gray-400">
          {year} | All rights reserved by{" "}
          <a href="/teamxyz" className="font-bold hover:underline text-sky-700 dark:text-sky-600">
            Team XYZ.
          </a>
        </p>
      </div>
    </footer>
  );
}
