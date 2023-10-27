import React from "react";
import { MdOutlineDarkMode, MdLogout, MdViewStream } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar({ sidebar, userName}) {
  
  const { logout } = useAuth0();

  const dark = () => {
    if (localStorage.theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  };

  return ( 
    <nav className="flex justify-between items-center w-full max-w-8xl px-10 py-5 border-b-2 border-zinc-100 dark:border-zinc-700 dark:text-zinc-200">
      <button
        onClick={sidebar}
        className="flex items-center gap-2.5 dark:text-white"
      >
        <div className="p-2 bg-zinc-100 dark:bg-zinc-700 rounded-lg w-fit h-fit">
          <MdViewStream className="text-2xl dark:text-white" />
        </div>
        <Link to="/portfolios" className="text-md font-semibold">
          PortLucid
        </Link>
      </button>
      <div className="mb-2 items-center text-lg dark:text-zinc-300 text-zinc-900">
        Welcome back,{" "}
        <span className="font-semibold dark:text-white">
          {userName}!
        </span>
      </div>
      <div className="flex items-center justify-self-end">
        <MdOutlineDarkMode
          onClick={dark}
          className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-200 dark:hover:text-white"
        />

        <span className="mx-2.5">|</span>
        <button
          onClick={logout}
          className="flex items-center gap-1.5 hover:text-zinc-800 dark:hover:text-white"
        >
          <MdLogout />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
