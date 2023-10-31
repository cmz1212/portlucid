import React from 'react';

function CustomAlert({ message }) {

  return (
    <div className="z-30 fixed top-1/4 left-1/2 transform -translate-x-1/2 p-6 rounded-lg shadow-lg text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600">
      <p className="text-center text-xl font-semibold">{message}</p>
    </div>
  );
}

export default CustomAlert;