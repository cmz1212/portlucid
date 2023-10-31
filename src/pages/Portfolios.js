import React, { useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import { io } from "socket.io-client";
import { URL } from "../constants";
import Download2File from "../support/Download2File";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import CustomAlert from '../components/CustomAlert';
import PortfolioNew from "../components/PortfolioNew";
import PortfolioDetails from "../components/PortfolioDetails";
import UploadPortfolio from "../components/UploadPortfolio";
import PlotGraph from "../components/PlotGraph";

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
  const [idUpdate, setidUpdate] = useState(null);
  const [selectedFile, setselectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const showAlertMessage = (message) => {
    setmsgAlert(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1100);
  }

  const handleDownloadPort = async(id, portfolio_name) => {
    if (progress > 0 && progress < 100) {
      showAlertMessage("Please wait for the current portfolio to be uploaded completely");
    } else {
      try {
        const response = await fetch(`${URL}/portfolios/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
        });
        if (response.ok) {
          const data = await response.json();
          Download2File({data, portfolio_name});
          showAlertMessage("Portfolio Downloaded Successfully");;
        } else {
          console.error("Error: ", response.statusText);
        }
      } catch (error) {
        console.error("Error: ", error);
      }

    }
  };

  const handleFileChange = async (event) => {
    if (event.target.files[0]) {
      setselectedFile(event.target.files[0]);
    }
  
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        const response = await fetch(`${URL}/portfolios/${idUpdate}`, {
          method: 'PUT',
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        });
  
        if (response.ok) {
          showAlertMessage("Portfolio Updated Successfully");
        } else {
          alert('Portfolio Update Failed. Status Code: ' + response.status);
        }
      }
    } catch (error) {
      alert('Fetch Error: ' + error.message);
    } finally {
      setselectedFile(null);
    }
  };  
  
  const handleUpdatePort = (id) => {
    if (progress > 0 && progress < 100) {
      showAlertMessage("Please wait for the current portfolio to be uploaded completely");
    } else {
      const confirmModify = window.confirm("Are you sure you want to update this portfolio?");
      if (confirmModify) {
        setidUpdate(id);
        fileInputRef.current.click();
      }
    }
  };
  
  const handleDeletePort = async (id) => {
    if (progress > 0 && progress < 100) {
      showAlertMessage("Please wait for the current portfolio to be uploaded completely");
    } else {
      const confirmDelete = window.confirm("Are you sure you want to delete this portfolio?");
      if (confirmDelete) {
        try {
          await fetch(`${URL}/portfolios/${id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
          });
          showAlertMessage("Portfolio Deleted Successfully");
        } catch (error) {
          alert('Fetch Error: ' + error.message);
        }
      }
    }
  };
  
  const handlePlotChange = (key) => {
    setIsPlot((prevIsPlot) => ({
      ...prevIsPlot,
      [key]: !prevIsPlot[key],
    }));
  };

  const handleRebalChange = (key) => {
    setExclRebalancing((prevExclRebalancing) => ({
      ...prevExclRebalancing,
      [key]: !prevExclRebalancing[key],
    }));
    showAlertMessage("Returns Updated");
  };

  useEffect(() => {
    const socket = io(`${URL}`, { autoConnect: false });
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
      
    if (isAuthenticated && progress === 0) {
      fetchAccessTokenAndData();
    }

    return () => {
      socket.disconnect();
    }

  }, [progress, portfolios, isPlot, exclRebalancing, isAuthenticated, getAccessTokenSilently]);
  
  return (
    <>
      { sidebar && (<SideBar sidebar={() => {setSidebar(false);}} openUploadModal={openUploadModal} progress={progress} userName={userName} portfolios={portfolios} />) }
      { showAlert && (<CustomAlert message={msgAlert} />) }
      { isUploadModalOpen && (<UploadPortfolio accessToken={accessToken} isOpen={isUploadModalOpen} onClose={closeUploadModal} />)}
      <div className="flex flex-col items-center h-screen w-screen dark:bg-zinc-900 overflow-y-auto home">
        <Navbar sidebar={() => {setSidebar(true);}} userName={userName} />
          <div className="grow flex flex-col w-full justify-center">
            <div className="flex justify-center">
              <div className="p-5 flex flex-col text-center rounded-3xl py-3">
                <h1 className="text-5xl font-bold dark:text-white text-zinc-900">
                  Overview
                </h1>
                <PlotGraph portfolios={portfolios} accessToken={accessToken} isPlot={isPlot} exclRebalancing={exclRebalancing} />
              </div>
            </div>
            <div className="grow w-full flex flex-col items-center bg-zinc-100 dark:bg-zinc-700 ">
              {(Array.isArray(portfolios) && portfolios.length > 0) ? (
                <div className="grid w-full max-w-8xl grid-cols-1 gap-5 p-4 justify-center">
                  {portfolios
                    .slice().sort((a, b) => a.portfolio_id - b.portfolio_id)
                    .map((portfolio, key) => {
                    return (
                      portfolio.intcov_ratio !== "" ? (
                        <div className="p-5 items-center rounded-xl text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 relative">
                          
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              <span className="whitespace-no-wrap text-3xl font-bold">{portfolio.portfolio_name}</span>
                              <span className="text-lg ml-15"><FaMoneyBillTrendUp style={{ transform: 'scale(1.1)'}}/></span>
                              <span className="text-lg ml-5">{`${portfolio.market_value}`}</span>
                            </div>
                            <div className="flex flex-col text-left mr-20">
                              <div className="text-95"><input type="checkbox" checked={isPlot[portfolio.portfolio_id]} onChange={() => handlePlotChange(portfolio.portfolio_id)} />{` Plot Performance`}</div>
                              <div className="text-95"><input type="checkbox" checked={exclRebalancing[portfolio.portfolio_id]} onChange={() => handleRebalChange(portfolio.portfolio_id)} />{` Disable Rebalancing`}</div>
                            </div>
                          </div>
                          <div className="options-button relative group">
                            ...
                              <div className="z-10 flex flex-col absolute min-w-160 shadow-md right-0 top-5 text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 border dark:border-zinc-600 hidden group-hover:flex">
                                <button className="text-base text-left font-semibold pl-1.5 pr-6" onClick={() => handleDownloadPort(portfolio.portfolio_id, portfolio.portfolio_name)}>Download</button>
                                <input type="file" accept=".csv" ref={fileInputRef} onChange={(event) => handleFileChange(event)} style={{ display: 'none' }} />
                                <button className="text-base text-left font-semibold pl-1.5 pr-6" onClick={() => handleUpdatePort(portfolio.portfolio_id)}>Update</button>
                                <button className="text-base text-left font-semibold pl-1.5 pr-6" onClick={() => handleDeletePort(portfolio.portfolio_id)}>Delete</button>
                              </div>
                          </div>
                          <br />
                          <PortfolioDetails portfolio={portfolio} exclRebalancing={exclRebalancing} />
                          <div>
                            {Object.keys(exclRebalancing).map(key => (
                            <div key={key}>{exclRebalancing[key]}</div>
                            ))}
                          </div>
                        </div>
                      ): null
                    );
                  })}

                  {(progress > 0 && progress < 100) && (<PortfolioNew progress={progress} message={message}/>)}

                </div>
              ) : (
                <div className="grid w-full max-w-8xl grid-cols-1 gap-5 p-4">
                  {progress > 0 && progress < 100 ? (
                    <PortfolioNew progress={progress} message={message} />
                  ) : (
                    <div className="mt-5 gap-15 text-2xl text-zinc-900 dark:text-white mx-auto">No Portfolio</div>
                  )}
                </div>
              )}
            </div>
          </div>
      </div>
    </>
  );
}

export default Portfolios;