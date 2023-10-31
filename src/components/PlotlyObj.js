import React from 'react';
import Plot from 'react-plotly.js';

export default function PlotlyObj({ portfolios, trendData }) {
  const plotlyData = [];

  if (Array.isArray(portfolios) && portfolios.length > 0) {
    for (const portfolio of portfolios) {
      const data = trendData[portfolio.portfolio_id];

      if (data && data.length > 0) {
        const dates = data.map((item) => {
          const date = new Date(item[0]); // Convert the date string to a Date object
          const day = date.getDate();
          const month = date.toLocaleString('default', { month: 'short' }); // Get the month abbreviation
          const year = date.getFullYear();
          return `${day}-${month}-${year}`;
        });

        const mv = data.map((item) => parseFloat(item[1])); // Assuming mv is at index 1

        plotlyData.push({
          type: 'scatter',
          mode: 'lines',
          name: portfolio.portfolio_name,
          x: dates,
          y: mv,
        });
      }
    }
  }

  const plotlyLayout = {
    width: '85%', // Make the chart roughly 15% smaller
    xaxis: {
      tickformat: '%d %b %Y',
      showline: true, // Show x-axis line
      showgrid: false, // Remove vertical grid lines
      tickvals: 'linear',
      dtick: 25 ,
      tickangle: 45,
      automargin: true, // Automatically adjust the x-axis margin
    },
    yaxis: {
      title: {
        text: 'Index',
        font: {
          weight: 'bold', // Make the y-axis title bold
        },
      },
    },
    legend: {
      x: 1, // Place the legend at the right
      y: 1, // Adjust the legend position as needed
    },
    margin: {
      t: 20, // Reduce top padding
      b: 20, // Reduce bottom padding
    },
    plot_bgcolor: 'transparent', // Set the plot background color to transparent
    paper_bgcolor: 'transparent', // Set the paper background color to transparent
  };

  return (
    <div className="graph-container">
      {plotlyData.length > 0 ? (
        <Plot data={plotlyData} layout={plotlyLayout} />
      ) : null}
    </div>
  );
}