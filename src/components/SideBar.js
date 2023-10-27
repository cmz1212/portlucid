import React from "react";
import { Link } from "react-router-dom";

function SideBar({ sidebar, openUploadModal, progress, userName, portfolios }) {
  
  const handleAddPortfolio = () => {
    if (progress > 0 && progress < 100) {
      alert("Please wait for current portfolio to be uploaded completely.");
      return;
    }
    openUploadModal();
    sidebar();
  };

  return (
    <>
      <div
        onClick={sidebar}
        className="z-20 absolute h-screen w-screen bg-black/50 dark:bg-zinc-100/50"
      ></div>
      <div className="z-30 absolute w-80 h-screen bg-white dark:bg-zinc-900 overflow-y-auto pb-7 sidebar">
        <div className="p-7">
          <p className="text-zinc-700 dark:text-zinc-400">
          Welcome,{" "}<span className="font-bold">{userName}</span>
          </p>
          {Array(2).fill(<br />)}
          <Link to="/portfolios" onClick={() => {sidebar();}}>
            <h2 className="mt-1 text-3xl font-bold dark:text-white">
              Overview
            </h2>
          </Link>
        </div>
        <hr className="mb-4 border-zinc-300 dark:border-zinc-700" />
          {portfolios.slice().reverse().map((portfolio, key) => {
            return (
              <Link
                key={key}
                to={`/portfolios/${portfolio.id}`}
                onClick={() => {
                  sidebar();
                }}
                className="block w-full text-left dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700  py-3 px-7 overflow-x-hidden"
                style={{ whiteSpace: "nowrap" }}
              >
               {portfolio.portfolio_name}
              </Link>
            )})}
        <hr className="my-4 border-zinc-300 dark:border-zinc-700" />
        <div className="px-7">
          <button onClick={handleAddPortfolio} className="w-full bg-zinc-200 py-2.5 rounded-md text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:text-white dark:hover:bg-zinc-800">
            Add Portfolio
          </button>
        </div>
      </div>
    </>
  );
}

export default SideBar;