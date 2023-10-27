import React, { useState, useEffect } from "react";
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { URL } from "../constants";
import { useAuth0 } from "@auth0/auth0-react";
import CustomAlert from '../components/CustomAlert';
import UploadPortfolio from "../components/UploadPortfolio";
import { io } from "socket.io-client";

function Portfolios() {

  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const userName = isAuthenticated ? user.name : null;
  const [accessToken, setAccessToken] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [sidebar, setSidebar] = useState(false);
  const [isPlot, setIsPlot] = useState({});
  const [exclRebalancing, setExclRebalancing] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [msgAlert, setmsgAlert] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  // Function to close the PostProj modal
  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleDownloadPort = (id) => {
    // Placeholder function for Download action
    setmsgAlert(`Download clicked for portfolio with ID: ${id}`);
    setShowAlert(true);
  };

  const handleUpdatePort = (id) => {
    // Placeholder function for Update action
    setmsgAlert(`Update clicked for portfolio with ID: ${id}`);
    setShowAlert(true);
  };

  const handleDeletePort = (id) => {
    // Placeholder function for Delete action
    setmsgAlert(`Delete clicked for portfolio with ID: ${id}`);
    setShowAlert(true);
  };

  const handlePlotChange = (key) => {
    setIsPlot((prevIsPlot) => ({
      ...prevIsPlot,
      [key]: !prevIsPlot[key],
    }));
    setmsgAlert(`Graph above updated`);
    setShowAlert(true);
  };

  const handleRebalChange = (key) => {
    setExclRebalancing((prevExclRebalancing) => ({
      ...prevExclRebalancing,
      [key]: !prevExclRebalancing[key],
    }));
    setmsgAlert(`Returns & Graph above updated`);
    setShowAlert(true);
  };

  useEffect(() => {

    if (isAuthenticated && progress===0) {
      const fetchData = async (accessToken) => {
        const url = `${URL}/portfolios`;
  
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`
            },
          });
  
          const data = await response.json();
          setPortfolios(data);
        } catch (error) {
          console.error("Error: ", error);
        }
      };
  
      const fetchAccessTokenAndData = async () => {
        try {
          const accessToken = await getAccessTokenSilently({
            audience: process.env.REACT_APP_API_AUDIENCE,
          });
          
          setAccessToken(accessToken);
          fetchData(accessToken);
        } catch (error) {
          console.error("Error fetching access token: ", error);
        }
      };
  
      fetchAccessTokenAndData();
    }

    const socket = io(`${URL}`, { autoConnect: false });
    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('connect_error', (err) => {
        console.error('Connection error:', err);
    });

    socket.on('disconnect', (reason) => {
        console.log('Disconnected from server, reason:', reason);
    });
    
    socket.on('progress', (data) => {
        setProgress(data.percent);
        setMessage(data.message);
    
        if(data.isCompleted) {
            setTimeout(() => {
                setProgress(0);
                setMessage('');
            }, 5000);
        }
    })

    socket.connect();

    return () => {
        console.log('Socket disconnecting...');
        socket.disconnect();
    }

  }, [portfolios, progress, isAuthenticated, getAccessTokenSilently]);
  

  return (
    <>
      { sidebar && (<SideBar sidebar={() => {setSidebar(false);}} openUploadModal={openUploadModal} progress={progress} userName={userName} portfolios={portfolios} />) }
      { showAlert && (<CustomAlert message={msgAlert} onClose={() => setShowAlert(false)}/>) }
      { isUploadModalOpen && (<UploadPortfolio accessToken={accessToken} isOpen={isUploadModalOpen} onClose={closeUploadModal} />)}
      <div className="flex flex-col items-center h-screen w-screen dark:bg-zinc-900 overflow-y-auto home">
        <Navbar sidebar={() => {setSidebar(true);}} userName={userName} />
          <div className="grow flex flex-col w-full">
            <div className="p-5">
              <div className="flex flex-col text-center h-fit rounded-3xl py-3">
                <h1 className="text-5xl font-bold dark:text-white text-zinc-900">
                  Overview
                </h1>
              </div>
            </div>
            <div className="grow w-full flex flex-col items-center bg-zinc-100 dark:bg-zinc-700 ">
              {Array.isArray(portfolios) ? (
                <div className="grid w-full max-w-8xl grid-cols-1 gap-5 p-4 justify-center">
                  {portfolios.slice().reverse().map((portfolio, key) => {
                    return (
                      <div className="p-5 items-center rounded-xl text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 relative">
                        
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <span className="whitespace-no-wrap text-3xl font-bold">{portfolio.portfolio_name}</span>
                            <span className="text-lg ml-20"><FaMoneyBillTrendUp style={{ transform: 'scale(1.1)'}}/></span>
                            <span className="text-lg ml-5">{`${portfolio.market_value}`}</span>
                          </div>
                          <div className="flex flex-col text-left mr-20">
                            <div className="text-95"><input type="checkbox" checked={isPlot[key]} onChange={() => handlePlotChange(key)} />{` Plot Performance`}</div>
                            <div className="text-95"><input type="checkbox" checked={exclRebalancing[key]} onChange={() => handleRebalChange(key)} />{` Disable Rebalancing`}</div>
                          </div>
                        </div>
                        <div className="options-button relative group">
                          ...
                            <div className="z-10 flex flex-col absolute min-w-160 shadow-md right-0 top-5 text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 border dark:border-zinc-600 hidden group-hover:flex">
                              <button className="text-base text-left font-semibold pl-1.5 pr-6" onClick={() => handleDownloadPort(portfolio.id)}>Download</button>
                              <button className="text-base text-left font-semibold pl-1.5 pr-6" onClick={() => handleUpdatePort(portfolio.id)}>Update</button>
                              <button className="text-base text-left font-semibold pl-1.5 pr-6" onClick={() => handleDeletePort(portfolio.id)}>Delete</button>
                            </div>
                        </div>

                        <br />

                        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-20 gap-y-5">
                          <div className="flex flex-col">
                            <div className="flex justify-between"><span className="font-semibold">{`Return (1-mth):`}</span><span className="text-right">{ exclRebalancing[key] ? portfolio.ret_1m_worebal : portfolio.ret_1m_wrebal }</span></div>
                            <div className="flex justify-between"><span className="font-semibold">{`Return (3-mth):`}</span><span className="text-right">{ exclRebalancing[key] ? portfolio.ret_3m_worebal : portfolio.ret_3m_wrebal }</span></div>
                            <div className="flex justify-between"><span className="font-semibold">{`Return (6-mth):`}</span><span className="text-right">{ exclRebalancing[key] ? portfolio.ret_6m_worebal : portfolio.ret_6m_wrebal }</span></div>
                            <div className="flex justify-between"><span className="font-semibold">{`Return (12-mth):`}</span><span className="text-right">{ exclRebalancing[key] ? portfolio.ret_12m_worebal : portfolio.ret_12m_wrebal }</span></div>
                          </div>
                          <div className="flex flex-col">
                            <div className="flex justify-between">
                              <span className="font-semibold relative group">{`Hist Vol:`}<span style={{whiteSpace:'nowrap'}} className="absolute top-0 -mt-7 -left-5 p-2 bg-zinc-800 text-white text-xs opacity-0 group-hover:opacity-90 pointer-events-none rounded-md transition-opacity duration-200">Historical Daily Volatility</span></span>
                              <span className="text-right">{portfolio.volatility}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-semibold relative group">{`Hist VaR:`}<span style={{whiteSpace:'nowrap'}} className="absolute top-0 -mt-7 -left-5 p-2 bg-zinc-800 text-white text-xs opacity-0 group-hover:opacity-90 pointer-events-none rounded-md transition-opacity duration-200">95% 5-Day Historical VaR</span></span>
                              <span className="text-right">{portfolio.hist_var}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-semibold relative group">{`Para VaR:`}<span style={{whiteSpace:'nowrap'}} className="absolute top-0 -mt-7 -left-5 p-2 bg-zinc-800 text-white text-xs opacity-0 group-hover:opacity-90 pointer-events-none rounded-md transition-opacity duration-200">95% 5-Day Parametric VaR</span></span>
                              <span className="text-right">{portfolio.para_var}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-semibold relative group">{`MC   VaR:`}<span style={{whiteSpace:'nowrap'}} className="absolute top-0 -mt-7 -left-5 p-2 bg-zinc-800 text-white text-xs opacity-0 group-hover:opacity-90 pointer-events-none rounded-md transition-opacity duration-200">95% 5-Day Monte Carlo VaR</span></span>
                              <span className="text-right">{portfolio.mc_var}</span>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <div className="flex justify-between">
                              <span className="font-semibold relative group">{`Max  DD:`}<span style={{whiteSpace:'nowrap'}} className="absolute top-0 -mt-7 -left-5 p-2 bg-zinc-800 text-white text-xs opacity-0 group-hover:opacity-90 pointer-events-none rounded-md transition-opacity duration-200">Maximum Drawdown</span></span>
                              <span className="text-right">{portfolio.max_dd}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-semibold relative group">{`Hist ES:`}<span style={{whiteSpace:'nowrap'}} className="absolute top-0 -mt-7 -left-5 p-2 bg-zinc-800 text-white text-xs opacity-0 group-hover:opacity-90 pointer-events-none rounded-md transition-opacity duration-200">95% 5-Day Expected Shortfall</span></span>
                              <span className="text-right">{portfolio.hist_es}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-semibold relative group">{`Para ES:`}<span style={{whiteSpace:'nowrap'}} className="absolute top-0 -mt-7 -left-5 p-2 bg-zinc-800 text-white text-xs opacity-0 group-hover:opacity-90 pointer-events-none rounded-md transition-opacity duration-200">95% 5-Day Expected Shortfall</span></span>
                              <span className="text-right">{portfolio.para_es}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-semibold relative group">{`MC   ES:`}<span style={{whiteSpace:'nowrap'}} className="absolute top-0 -mt-7 -left-5 p-2 bg-zinc-800 text-white text-xs opacity-0 group-hover:opacity-90 pointer-events-none rounded-md transition-opacity duration-200">95% 5-Day Expected Shortfall</span></span>
                              <span className="text-right">{portfolio.mc_es}</span>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <div className="flex justify-between"><span className="font-semibold">{`Benchmark:`}</span><span className="text-right">{portfolio.benchmark}</span></div>
                            <div className="flex justify-between"><span className="font-semibold">{`Alpha:`}</span><span className="text-right">{portfolio.alpha}</span></div>
                            <div className="flex justify-between"><span className="font-semibold">{`Beta:`}</span><span className="text-right">{portfolio.beta}</span></div>
                            <div className="flex justify-between"><span className="font-semibold">{`R-Squared:`}</span><span className="text-right">{portfolio.r_squared}</span></div>
                          </div>
                          <div className="flex flex-col">
                            <div className="flex justify-between"><span className="font-semibold">{`Sharpe Ratio:`}</span><span className="text-right">{portfolio.sharpe}</span></div>
                            <div className="flex justify-between"><span className="font-semibold">{`Sortino Ratio:`}</span><span className="text-right">{portfolio.sortino}</span></div>
                            <div className="flex justify-between"><span className="font-semibold">{`Treynor Ratio:`}</span><span className="text-right">{portfolio.treynor}</span></div>
                          </div>
                          <div className="flex flex-col">
                            <div className="flex justify-between"><span className="font-semibold">{`P/E Ratio:`}</span><span className="text-right">{portfolio.pe_ratio}</span></div>
                            <div className="flex justify-between"><span className="font-semibold">{`P/S Ratio:`}</span><span className="text-right">{portfolio.ps_ratio}</span></div>
                            <div className="flex justify-between"><span className="font-semibold">{`D/E Ratio:`}</span><span className="text-right">{portfolio.de_ratio}</span></div>
                            <div className="flex justify-between"><span className="font-semibold">{`Int Cov Ratio:`}</span><span className="text-right">{portfolio.intcov_ratio}</span></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {(progress > 0 && progress < 100) && (
                    <div style={{ height: '205px' }} className="p-6 items-center rounded-xl text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 relative">
                      <div className="p-4 flex flex-col items-center">
                        <div className="mb-2 text-left">
                          <span>{message}</span>
                        </div>
                        <progress className="w-9/10 bg-zinc-200 dark:bg-zinc-700" value={progress} max="100"></progress>
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <div className="gap-15 text-xl text-zinc-900 dark:text-white">No Portfolios</div>
              )}
            </div>
          </div>
      </div>
    </>
  );
}

export default Portfolios;