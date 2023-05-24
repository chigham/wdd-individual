import {apiResults, getDateResults, apiRequest} from "/js/power-api-results.mjs";//"/wdd-individual/final-project/js/power-api-results.mjs";
import convertUnits from "/js/convert-units.mjs";//"/wdd-individual/final-project/js/convert-mm-to-in.mjs";
import downloadCSV from "/js/download-csv.mjs";//"/wdd-individual/final-project/js/download-csv.mjs";
//import timeZoneOffset from "/js/timezone-offset.mjs";

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
    let mps = 0; // wind speed in meters per second
    let degC = 0; // temperature in degrees celsius
    let i = 0; // iterator

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
                } else if (temporal == "Hour") {
                    mm = jsonData.properties.parameter.PRECTOTCORR[parseInt(dateResults.Year + dateResults.Month.toString().padStart(2, '0') + dateResults.Day.toString().padStart(2, '0') + dateResults.Hour.toString().padStart(2, '0'))];
                    console.log(jsonData.properties);
                    timeZoneOffset(40.3, -111.7);
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
                    pct = jsonData.properties.parameter.RH2M[parseInt(dateResults.Year + '13')]
                } else if (temporal == "Month") {
                    pct = jsonData.properties.parameter.RH2M[parseInt(dateResults.Year + dateResults.Month.toString().padStart(2, '0'))];
                } else if (temporal == "Day") {
                    pct = jsonData.properties.parameter.RH2M[parseInt(dateResults.Year + dateResults.Month.toString().padStart(2, '0') + dateResults.Day.toString().padStart(2, '0'))];
                } else if (temporal == "Hour") {
                    pct = jsonData.properties.parameter.RH2M[parseInt(dateResults.Year + dateResults.Month.toString().padStart(2, '0') + dateResults.Day.toString().padStart(2, '0') + dateResults.Hour.toString().padStart(2, '0'))];
                } else if (temporal == "Custom") {
                    for (const key in jsonData.properties.parameter.RH2M) {
                        if (!isNaN(jsonData.properties.parameter.RH2M[key])) {
                            pct += jsonData.properties.parameter.RH2M[key];
                            i += 1;
                        }
                    }
                    pct = parseFloat(pct / i).toFixed(2);
                }
                content = pct + "%";
            } else if (indicator == "WS2M") { 
                if (temporal == "Year") {
                    mps = jsonData.properties.parameter.WS2M[parseInt(dateResults.Year + '13')]
                } else if (temporal == "Month") {
                    mps = jsonData.properties.parameter.WS2M[parseInt(dateResults.Year + dateResults.Month.toString().padStart(2, '0'))];
                } else if (temporal == "Day") {
                    mps = jsonData.properties.parameter.WS2M[parseInt(dateResults.Year + dateResults.Month.toString().padStart(2, '0') + dateResults.Day.toString().padStart(2, '0'))];
                } else if (temporal == "Hour") {
                    mps = jsonData.properties.parameter.WS2M[parseInt(dateResults.Year + dateResults.Month.toString().padStart(2, '0') + dateResults.Day.toString().padStart(2, '0') + dateResults.Hour.toString().padStart(2, '0'))];
                    /*console.log(mps);
                    console.log(jsonData.properties);
                    timeZoneOffset(37.7749, -122.4194)
                        .then(function(offset) {
                            // Handle the time zone offset value
                            let butt = 0;
                            console.log("Time Zone Offset:", offset);
                            butt = offset;
                            console.log(butt);
                        })
                        .catch(function(error) {
                            // Handle any errors that occurred
                            console.error("Error:", error);
                        });*/
                } else if (temporal == "Custom") {
                    for (const key in jsonData.properties.parameter.WS2M) {
                        if (!isNaN(jsonData.properties.parameter.WS2M[key])) {
                            mps += jsonData.properties.parameter.WS2M[key];
                            i += 1;
                        }
                    }
                    mps = mps / i;
                }
                content = convertUnits(mps, "mps")
            } else if (indicator == "T2M") {
                if (temporal == "Year") {
                    degC = jsonData.properties.parameter.T2M[parseInt(dateResults.Year + '13')]
                } else if (temporal == "Month") {
                    degC = jsonData.properties.parameter.T2M[parseInt(dateResults.Year + dateResults.Month.toString().padStart(2, '0'))];
                } else if (temporal == "Day") {
                    degC = jsonData.properties.parameter.T2M[parseInt(dateResults.Year + dateResults.Month.toString().padStart(2, '0') + dateResults.Day.toString().padStart(2, '0'))];
                } else if (temporal == "Hour") {
                    degC = jsonData.properties.parameter.T2M[parseInt(dateResults.Year + dateResults.Month.toString().padStart(2, '0') + dateResults.Day.toString().padStart(2, '0') + dateResults.Hour.toString().padStart(2, '0'))];
                } else if (temporal == "Custom") {
                    for (const key in jsonData.properties.parameter.T2M) {
                        if (!isNaN(jsonData.properties.parameter.T2M[key])) {
                            degC += jsonData.properties.parameter.T2M[key];
                            i += 1;
                        }
                    }
                    degC = degC / i;
                }
                content = convertUnits(degC, "degC")
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
        })
        .catch((error) => {
            progress.innerHTML = "Error";
            mobileProgressIndicator.style.color = "red";
            mobileProgressIndicator.style.fontWeight = "bold";
            console.error("Error:", error);
            throw error;
        })
}