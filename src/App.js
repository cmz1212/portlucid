import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Portfolios from "./pages/Portfolios";
import Portfolio from "./pages/Portfolio";


function App() {

  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <>
        <Routes>
          <Route exact path="/portfolios/:portfolio_id" element={<Portfolio />}/>
          <Route exact path="/portfolios" element={<Portfolios />}/>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  );

}

export default App;