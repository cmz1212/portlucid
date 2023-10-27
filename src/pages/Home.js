import React, { useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function Home() {
  
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/portfolios");
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="grid justify-items-center bg-white w-full ">
      <Nav />
      <div className="bg-white px-10 pt-24 pb-48 w-full max-w-7xl">
        <div className="pl-3 text-center">
          <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-zinc-900">
            Welcome to{" "}
            <span className="font-extralight text-zinc-900">
              {" "}
              Port<span className="font-bold">Lucid</span>{" "}
            </span>
          </h1>
          <p className="mt-4 text-zinc-600 text-md sm:text-lg lg:text-xl">
            Enhance transparency of your investment portfolios
          </p>
        </div>
      </div>
      <div className="grid justify-items-center bg-white p-8 w-full">
        <div className="w-full max-w-7xl">
          <h2 className="font-bold text-center text-zinc-900 first-line:selection:text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Why use PortLucid?
          </h2>
          <hr className="my-5" />
          <div
            id="features"
            className="grid lg:grid-cols-3 place-items-center gap-5"
          >
            <div class="p-6 pt-0 text-center">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-zinc-900">
                Clarity
              </h5>
              <br/>
              <p class="mb-4 font-normal text-zinc-600">
                Perpective at an aggregated level<br/>to support asset allocation
              </p>
            </div>
            <div class="p-6 pt-0 text-center">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-zinc-900">
                Discipline
              </h5>
              <br/>
              <p class="mb-4 font-normal text-zinc-600">
                Cultivate investment discipline<br/>through evidence-based metrics 
              </p>
            </div>
            <div class="p-6 pt-0 text-center">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-zinc-900">
                Insights
              </h5>
              <br/>
              <p class="mb-4 font-normal text-zinc-600">
                Balance sources of returns and risks<br/>with risk-adjusted data
              </p>
            </div>
          </div>
          <hr className="my-5" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;