import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <nav className="w-full flex flex-row h-16  px-20 fixed top-0 right-0 bg-gray-50/5   backdrop-blur-lg border-b-[1px] border-sky-500 ">
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
            <div className="w-[2px] h-9 bg-gray-950 dark:bg-sky-500 absolute left-0 "></div>
            {/* Theme switch */}
            <ThemeIcon />
            {/* unsigned user */}
            <UnsignedUser />
            {/* signed user */}
            {/* <div className="w-full h-full flex justify-end items-center gap-3 bg-red-50"></div> */}
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

function ThemeIcon() {
  return (
    <div className="px-2 pl-5">
      <div className="w-full h-full p-2 rounded-full bg-gray-200/45 dark:bg-gray-50/10 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6 text-sky-500"
        >
          <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
        </svg>
      </div>
    </div>
  );
}

function UnsignedUser() {
  return (
    <div className="w-full h-full flex justify-end items-center ">
      <button className="px-6 py-2 font-semibold text-base  hover:text-sky-600 hover:underline ">
        Login
      </button>
      <button className="px-6 py-2 font-semibold border-2 border-sky-400 text-base rounded-[3px] hover:bg-sky-400 hover:text-gray-700 dark:border-sky-600 dark:hover:bg-sky-600 dark:hover:text-gray-950">
        Signin
      </button>
    </div>
  );
}
