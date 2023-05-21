export default async function downloadCSV(apiUrl) {
    apiUrl = apiUrl.replace("=JSON", "=CSV");
    let junk = await fetch(apiUrl);
}