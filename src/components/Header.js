import React from "react";
import { Link } from "react-router-dom";

function Header({ heading, paragraph, linkName, linkUrl = "#" }) {
  return (
    <div className="mb-10">
      <Link to="/">
        <h1 className="text-center font-extralight text-4xl text-zinc-600">
          Port<span className="font-bold">Lucid</span>{" "}
        </h1>
      </Link>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-zinc-900 dark:text-white">
        {heading}
      </h2>
      <p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-300">
        {paragraph}{" "}
        <Link to={linkUrl} className="font-medium dark:text-white">
          {linkName}
        </Link>
      </p>
    </div>
  );
}

export default Header;