import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Nav() {
  
  const { loginWithRedirect } = useAuth0();

  return (
    <nav className="flex justify-between items-center w-full max-w-7xl px-3 py-3 border-b-2 mx-10 border-zinc-800 text-zinc-100">
      <Link to="/">
        <h1 className="text-center font-extralight text-2xl text-zinc-800">
          Port<span className="font-bold">Lucid</span>{" "}
        </h1>
      </Link>
      <div className="py-2 px-5 bg-zinc-800 hover:bg-zinc-500 focus:bg-zinc-500 rounded-lg font-bold">
        <button className="text-md text-zinc-100" onClick={() => loginWithRedirect()}>Sign In</button>
      </div>
    </nav>
  );
}

export default Nav;
