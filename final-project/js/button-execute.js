import {apiResults, getDateResults, apiRequest} from "/wdd-individual/final-project/js/power-api-results.mjs";//"/js/power-api-results.mjs";
import convertUnits from "/wdd-individual/final-project/js/convert-units.mjs";//"/js/convert-mm-to-in.mjs";
import downloadCSV from "/wdd-individual/final-project/js/download-csv.mjs";//"/js/download-csv.mjs";
import setLocalStorageFields from "/wdd-individual/final-project/js/set-local-storage.mjs";//"/js/set-local-storage.mjs"

const form = document.getElementById('formElem');
form.addEventListener('submit', createSubmitData);

const progress = document.getElementById('progress');
const results = document.getElementById('results');
const mobileProgressIndicator = document.getElementById('mobile-progress-indicator');

var newParagraph;
var newButton;

function createSubmitData(event) {
    // Prevent form submission
    event.preventDefault();

    // Get the form values
    const temporal = document.getElementById('temporal').value;
    const lon = document.getElementById('lon').value;
    const lat = document.getElementById('lat').value;
    const indicator = document.getElementById('indicator').value;
    const dateResults = getDateResults(temporal);
    const url = apiResults(indicator, temporal, lon, lat, dateResults);
    let mm = 0; // milsimeters of precipitation
    let pct = 0; // relative humidity percent
    let mpsDegC = 0; // wind speed in mps or temperature in degC
    let i = 0; // iterator

    let maxValue = null;
    let minValue = null;
    let customMinMax = "";

    // Call the apiResults function with the form values
    const dataResults = apiRequest(url, dateResults, progress)
        .then(({jsonData, dateResults}) => {
            let content = "";
            if (indicator == "PRECTOTCORR") {
                if (temporal == "Year") {
                    mm = jsonData.properties.parameter.PRECTOTCORR_SUM[parseInt(dateResults.Year + '13')]
                } else if (temporal == "Month") {
                    mm = jsonData.properties.parameter.PRECTOTCORR_SUM[parseInt(dateResults.Year + dateResults.Month.toString().padStart(2, '0'))];
                } else if (temporal == "Day") {
                    mm = jsonData.properties.parameter.PRECTOTCORR[parseInt(dateResults.Year + dateResults.Month.toString().padStart(2, '0') + dateResults.Day.toString().padStart(2, '0'))];
                } else if (temporal == "Custom") {
                    for (const key in jsonData.properties.parameter.PRECTOTCORR) {
                        if (!isNaN(jsonData.properties.parameter.PRECTOTCORR[key])) {
                            mm += jsonData.properties.parameter.PRECTOTCORR[key];
                        }
                    }
                }
                content = convertUnits(mm, "mm");
            } else if (indicator == "RH2M") {
                if (temporal == "Year") {
                    pct = jsonData.properties.parameter[indicator][parseInt(dateResults.Year + '13')]
                } else if (temporal == "Month") {
                    pct = jsonData.properties.parameter[indicator][parseInt(dateResults.Year + dateResults.Month.toString().padStart(2, '0'))];
                } else if (temporal == "Day") {
                    pct = jsonData.properties.parameter[indicator][parseInt(dateResults.Year + dateResults.Month.toString().padStart(2, '0') + dateResults.Day.toString().padStart(2, '0'))];
                } else if (temporal == "Custom") {
                    for (const key in jsonData.properties.parameter[indicator]) {
                        if (!isNaN(jsonData.properties.parameter[indicator][key])) {
                            pct += jsonData.properties.parameter[indicator][key];
                            i += 1;
                        }
                    }
                    pct = parseFloat(pct / i).toFixed(2);
                }
                content = pct + "%";
            } else if (indicator == "WS2M" || indicator == "T2M") { 
                if (temporal == "Year") {
                    mpsDegC = jsonData.properties.parameter[`${indicator}`][parseInt(dateResults.Year + '13')];
                    maxValue = jsonData.properties.parameter[`${indicator}_MAX`][parseInt(dateResults.Year + '13')];
                    minValue = jsonData.properties.parameter[`${indicator}_MIN`][parseInt(dateResults.Year + '13')];
                } else if (temporal == "Month") {
                    mpsDegC = jsonData.properties.parameter[`${indicator}`][parseInt(dateResults.Year + dateResults.Month.toString().padStart(2, '0'))];
                    maxValue = jsonData.properties.parameter[`${indicator}_MAX`][parseInt(dateResults.Year + dateResults.Month.toString().padStart(2, '0'))];
                    minValue = jsonData.properties.parameter[`${indicator}_MIN`][parseInt(dateResults.Year + dateResults.Month.toString().padStart(2, '0'))];
                } else if (temporal == "Day") {
                    mpsDegC = jsonData.properties.parameter[`${indicator}`][parseInt(dateResults.Year + dateResults.Month.toString().padStart(2, '0') + dateResults.Day.toString().padStart(2, '0'))];
                    maxValue = jsonData.properties.parameter[`${indicator}_MAX`][parseInt(dateResults.Year + dateResults.Month.toString().padStart(2, '0') + dateResults.Day.toString().padStart(2, '0'))];
                    minValue = jsonData.properties.parameter[`${indicator}_MIN`][parseInt(dateResults.Year + dateResults.Month.toString().padStart(2, '0') + dateResults.Day.toString().padStart(2, '0'))];
                } else if (temporal == "Custom") {
                    for (const key in jsonData.properties.parameter[`${indicator}`]) {
                        if (!isNaN(jsonData.properties.parameter[`${indicator}`][key])) {
                            mpsDegC += jsonData.properties.parameter[`${indicator}`][key];
                            i += 1;
                            if (maxValue === null || jsonData.properties.parameter[`${indicator}`][key] > maxValue) {
                                maxValue = jsonData.properties.parameter[`${indicator}`][key];
                            }
                            if (minValue === null || jsonData.properties.parameter[`${indicator}`][key] < minValue) {
                                minValue = jsonData.properties.parameter[`${indicator}`][key];
                            }
                        }
                    }
                    mpsDegC = mpsDegC / i;
                }
                let unit = "mps";
                if (indicator == "T2M") {unit = "degC"}
                customMinMax = "<br>Max:<br>" + convertUnits(maxValue, unit) + "<br>Min:<br>" + convertUnits(minValue, unit);
                content = convertUnits(mpsDegC, unit) + customMinMax;
            }

            // Clear existing content except for the 'progress' div
            while (results.children.length > 1) {
                results.removeChild(results.lastChild);
                results.removeChild(results.lastChild);
            }
        
            // Append new content after 'progress' div
            const newContent = document.createElement('div');
            newContent.innerHTML = content;
            mobileProgressIndicator.style.color = "green";
            mobileProgressIndicator.style.fontWeight = "bold";
            results.appendChild(newContent);

            // Append a download data button
            newParagraph = document.createElement('p');
            newButton = document.createElement('button');
            newButton.innerHTML = "Download Data";
            newParagraph.appendChild(newButton);
            results.appendChild(newParagraph);

            newButton.addEventListener("click", () => downloadCSV(url));

            // Set local storage
            let inputs = "inputValues";
            let inputValues = {
                "lat": lat,
                "lon": lon,
                "indicator": indicator,
                "temporal": temporal,
                "dateResults": dateResults
            };
            setLocalStorageFields(inputs, inputValues);
        })
        .catch((error) => {
            progress.innerHTML = "Error";
            mobileProgressIndicator.style.color = "red";
            mobileProgressIndicator.style.fontWeight = "bold";
            console.error("Error:", error);
            throw error;
        })
}