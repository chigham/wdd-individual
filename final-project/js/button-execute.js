import {apiResults, getDateResults, apiRequest} from "/wdd-individual/final-project/js/power-api-results.mjs";//"/js/power-api-results.mjs";
import convertMMtoIN from "/wdd-individual/final-project/js/convert-mm-to-in.mjs";//"/js/convert-mm-to-in.mjs";
import downloadCSV from "/wdd-individual/final-project/js/download-csv.mjs";//"/js/download-csv.mjs";

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
    const dateResults = getDateResults(temporal);
    const url = apiResults(temporal, lon, lat, dateResults);
    let mm = 0;

    // Call the apiResults function with the form values
    const dataResults = apiRequest(url, dateResults, progress)
        .then(({jsonData, dateResults}) => {
            let content = "";
            if (temporal == "Year") {
                mm = jsonData.properties.parameter.PRECTOTCORR_SUM[parseInt(dateResults.Year + '13')]
                content = mm + " mm<br>" + convertMMtoIN(mm).inches + "<br>" + convertMMtoIN(mm).feet;
            } else if (temporal == "Month") {
                mm = jsonData.properties.parameter.PRECTOTCORR_SUM[parseInt(dateResults.Year + dateResults.Month.toString().padStart(2, '0'))];
                content = mm + " mm<br>" + convertMMtoIN(mm).inches + "<br>" + convertMMtoIN(mm).feet;
            } else if (temporal == "Day") {
                mm = jsonData.properties.parameter.PRECTOTCORR[parseInt(dateResults.Year + dateResults.Month.toString().padStart(2, '0') + dateResults.Day.toString().padStart(2, '0'))];
                content = mm + " mm<br>" + convertMMtoIN(mm).inches + "<br>" + convertMMtoIN(mm).feet;
            } else if (temporal == "Hour") {
                mm = jsonData.properties.parameter.PRECTOTCORR[parseInt(dateResults.Year + dateResults.Month.toString().padStart(2, '0') + dateResults.Day.toString().padStart(2, '0') + dateResults.Hour.toString().padStart(2, '0'))];
                content = mm  + " mm<br>" + convertMMtoIN(mm).inches + "<br>" + convertMMtoIN(mm).feet;
            } else if (temporal == "Custom") {
                let mm = 0;
                for (const key in jsonData.properties.parameter.PRECTOTCORR) {
                    mm += jsonData.properties.parameter.PRECTOTCORR[key];
                }
                content = parseFloat(mm.toFixed(2)) + " mm<br>" + convertMMtoIN(mm).inches + "<br>" + convertMMtoIN(mm).feet;
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