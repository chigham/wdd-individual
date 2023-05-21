export default async function downloadCSV(apiUrl) {
    apiUrl = apiUrl.replace("=JSON", "=CSV");
    // Fetch the CSV file
    const response = await fetch(apiUrl);

    // Get the blob data from the response
    const blob = await response.blob();

    // Create a temporary URL for the blob
    const url = URL.createObjectURL(blob);

    // Create a link element and set its attributes
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.csv"; // Set the desired filename for the downloaded file

    // Simulate a click event to trigger the file download
    link.click();

    // Clean up the temporary URL
    URL.revokeObjectURL(url);
}