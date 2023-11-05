import React, { useEffect, useState } from "react";
import PlotlyObj from "./PlotlyObj";
import { URL } from "../constants";

async function fetchData(portfolioId, accessToken, excludeRebalancing) {
  try {
    const response = await fetch(`${URL}/scaled_mv_trends/${portfolioId}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Rebal: !excludeRebalancing,
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch data for portfolio', portfolioId);
      return null;
    }
  } catch (error) {
    console.error('Error while fetching data:', error);
    return null;
  }
}

export default function PlotGraph({ portfolios, accessToken, isPlot, exclRebalancing }) {
  const [trendData, setTrendData] = useState({});

  useEffect(() => {
    async function fetchAndProcessDataForPortfolios() {
      for (const portfolioId in isPlot) {
        if (isPlot[portfolioId]) {
          const data = await fetchData(portfolioId, accessToken, exclRebalancing[portfolioId]);
          if (data) {
            setTrendData((prevData) => ({
              ...prevData,
              [portfolioId]: data,
            }));
          }
        } else {
          // If isPlot[portfolioId] is false, delete it from trendData
          setTrendData((prevData) => {
            const newData = { ...prevData };
            delete newData[portfolioId];
            return newData;
            });
        }
      }
    }

    fetchAndProcessDataForPortfolios();
  }, [accessToken, isPlot, exclRebalancing]);

  // Check if isPlot is not empty and has at least one true value
  const shouldRenderPlotlyObj = Object.values(isPlot).some((value) => value);

  return shouldRenderPlotlyObj ? (
    <PlotlyObj portfolios={portfolios} trendData={trendData} />
  ) : null;
}