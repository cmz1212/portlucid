export default function Download2File({ data, portfolio_name }) {

  // Extract only the "ticker" and "position" columns
  const extractedData = data.map(item => {
    return {
      ticker: item.ticker,
      position: item.position
    };
  });
  
  /// Convert data to CSV format
  function convertJSONToCSV(data) {
    const header = Object.keys(data[0]).join(",");
    const csv = data.map(item => Object.values(item).join(",")).join("\n");
    return `${header}\n${csv}`;
  }

  const csvData = convertJSONToCSV(extractedData);

  // Create a Blob with the CSV data
  const blob = new Blob([csvData], { type: "text/csv" });

  // Create a download link
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${portfolio_name}.csv`;
  a.style.display = "none";

  // Trigger the click event to initiate the download
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  return null;
}