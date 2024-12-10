import { IconCopy } from "./Icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white w-full ">
      <div className="w-full py-4 flex flex-row justify-center items-center ">
        <IconCopy className="text-gray-400 size-7" />{" "}
        <p className="text-md font-semibold pl-2 text-gray-400">
          {year} | All rights reserved by{" "}
          <a href="/teamxyz" className="font-bold hover:underline text-sky-600">
            Team XYZ.
          </a>
        </p>
      </div>
    </footer>
  );
}
