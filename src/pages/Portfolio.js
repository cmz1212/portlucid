import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { URL } from "../constants";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import UploadPortfolio from "../components/UploadPortfolio";

function Portfolio() {

  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const userName = isAuthenticated ? user.name : null;
  const [portfolios, setPortfolios] = useState([]);
  const [portfolioName, setPortfolioName] = useState("");
  const [underPortfolio, setUnderPortfolio] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const { portfolio_id } = useParams();
  const progress = 0;

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  }

  useEffect(() => {

    const fetchData = async (accessToken) => {
      
      // Underlying Stocks of Portfolio
      try {
        const url = `${URL}/portfolios/${portfolio_id}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
        });
        const data = await response.json();
        setUnderPortfolio(data);

        // All Portfolios for Sidebar
        const urlAll = `${URL}/portfolios`;
        const responseAll = await fetch(urlAll, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
        });

        const dataAll = await responseAll.json();
        setPortfolios(dataAll)

        const portName = portfolios
          .filter(item => parseInt(item.portfolio_id, 10) === parseInt(portfolio_id, 10))
          .map(item => item.portfolio_name)[0];
        console.log(portfolios);
        console.log(portfolios
          .filter(item => parseInt(item.portfolio_id, 10) === parseInt(portfolio_id, 10)));
        console.log(portfolios
            .filter(item => parseInt(item.portfolio_id, 10) === parseInt(portfolio_id, 10))
            .map(item => item.portfolio_name));
        setPortfolioName(portName);
        console.log(portName)

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
  }, [portfolios, portfolio_id, isAuthenticated, getAccessTokenSilently]);

  const renderPortfolioData = () => {
    return (
      <div>
        {Array(2).fill(<br/>)}
        <div className="portfolio-container">
          <table className="table">
          <thead>
            <tr>
                <th>Company</th>
                <th>Weight</th>
                <th>Last Px</th>
                <th>Market Value</th>
                <th>Volatility</th>
                <th>{`Ret(1m)`}</th>
                <th>{`Ret(3m)`}</th>
                <th>{`Ret(6m)`}</th>
                <th>{`Ret(12m)`}</th>
                <th>PE Ratio</th>
                <th>PS Ratio</th>
                <th>DE Ratio</th>
                <th>IntCov Ratio</th>
                <th>Ticker</th>
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              {underPortfolio.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "even-row" : ""}>
                  <td>{item.company_name}</td>
                  <td>{item.weight}</td>
                  <td>{item.last_price}</td>
                  <td>{item.market_value}</td>
                  <td>{item.volatility}</td>
                  <td>{item.ret_1m}</td>
                  <td>{item.ret_3m}</td>
                  <td>{item.ret_6m}</td>
                  <td>{item.ret_12m}</td>
                  <td>{item.pe_ratio}</td>
                  <td>{item.ps_ratio}</td>
                  <td>{item.de_ratio}</td>
                  <td>{item.intcov_ratio}</td>
                  <td>{item.ticker}</td>
                  <td>{item.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };  
  
  return (
    <>
      { sidebar && (<SideBar sidebar={() => {setSidebar(false);}} openUploadModal={openUploadModal} progress={progress} userName={userName} portfolios={portfolios} />) }
      { isUploadModalOpen && (<UploadPortfolio accessToken={accessToken} isOpen={isUploadModalOpen} onClose={closeUploadModal} />)}
      <div className="flex flex-col items-center h-screen w-screen dark:bg-zinc-900 overflow-y-auto home">
        <Navbar sidebar={() => {setSidebar(true);}} userName={userName} />
          <div className="grow flex flex-col w-full">
            <div className="p-5">
              <div className="flex flex-col text-center h-fit rounded-3xl py-3">
                <h1 className="text-5xl font-bold dark:text-white text-zinc-900">
                  {portfolioName}
                </h1>
              </div>
            </div>
            <div className="grow w-full flex flex-col items-center bg-zinc-100 dark:bg-zinc-700 ">
              <div className="grid w-full max-w-8xl grid-cols-1 gap-5 p-4 justify-center">
              {underPortfolio.length> 0 ? (renderPortfolioData()) : (
                <div className="mt-5 gap-15 text-center text-2xl text-zinc-900 dark:text-white">Loading...</div>
              )}
              </div>
            </div>
          </div>
      </div>
    </>
  );
}

export default Portfolio;