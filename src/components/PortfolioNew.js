import React from 'react';

function PortfolioNew({ progress, message }) {
    return (
        <div style={{ height: '205px' }} className="p-6 items-center rounded-xl text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 relative">
            <div className="p-4 flex flex-col items-center">
            <div className="mb-2 text-left">
                <span>{message}</span>
            </div>
            <progress className="w-9/10 bg-zinc-200 dark:bg-zinc-700" value={progress} max="100"></progress>
            </div>
        </div>
  );
}

export default PortfolioNew;