import React from "react";
import notFound from "../static/error.png";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="grid place-items-center h-screen dark:bg-zinc-900 ">
      <div className="grid justify-items-center">
        <img src={notFound} className="h-96 w-auto" alt="Not Found" />
        <br />
        <h1 className="text-center sm:text-xl md:text-3xl lg:text-5xl font-semibold text-zinc-900 dark:text-white">
          Page not found!
        </h1>
        {Array(2).fill(<br />)}
        <button className="relative z-30 text-md md:text-xl font-semibold text-white bg-zinc-700 hover:bg-zinc-600 w-fit px-5 py-2 rounded-md">
          <Link to="/">Return to Home</Link>
        </button>
      </div>
    </div>
  );
}

export default NotFound;