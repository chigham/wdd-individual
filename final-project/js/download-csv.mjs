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

    // Name the file based on apiUrl string values
    const startParam = "start=";
    const endParam = "&end=";
    const startIndex = apiUrl.indexOf(startParam) + startParam.length;
    const endIndex = apiUrl.indexOf(endParam);
    const startValue = apiUrl.substring(startIndex, endIndex);
    const endValue = apiUrl.substring(endIndex + endParam.length, apiUrl.indexOf("&", endIndex + 1));
    const latParam = "latitude=";
    const lonParam = "&longitude=";
    const latIndex = apiUrl.indexOf(latParam) + latParam.length;
    const lonIndex = apiUrl.indexOf(lonParam);
    const latEndIndex = apiUrl.indexOf("&", latIndex);
    const lonEndIndex = apiUrl.indexOf("&", lonIndex + lonParam.length);
    const latValue = apiUrl.substring(latIndex, latEndIndex !== -1 ? latEndIndex : apiUrl.length);
    const lonValue = apiUrl.substring(lonIndex + lonParam.length, lonEndIndex !== -1 ? lonEndIndex : apiUrl.length);
    const temporalStart = "temporal/";
    const temporalEnd = "/point?";
    const temporalIndex = apiUrl.indexOf(temporalStart) + temporalStart.length;
    const temporalValue = apiUrl.substring(temporalIndex, apiUrl.indexOf(temporalEnd));

    link.download = `${temporalValue}_precipitation_at_${latValue}-${lonValue}_from_${startValue}-${endValue}.csv`;

    // Simulate a click event to trigger the file download
    link.click();

    // Clean up the temporary URL
    URL.revokeObjectURL(url);
}