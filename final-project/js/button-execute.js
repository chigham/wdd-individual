import {apiResults, getDateResults} from "/js/power-api-results.mjs";
import convertMMtoIN from "/js/convert-mm-to-in.mjs";
import downloadCSV from "/js/download-csv.mjs";

const form = document.getElementById('formElem');
form.addEventListener('submit', createSubmitData);

const progress = document.getElementById('progress');
const results = document.getElementById('results');

function createSubmitData(event) {
    event.preventDefault(); // Prevent form submission

    // Get the form values
    const temporal = document.getElementById('temporal').value;
    const lon = document.getElementById('lon').value;
    const lat = document.getElementById('lat').value;
    const dateResults = getDateResults(temporal);
    let mm = 0;

    // Call the apiResults function with the form values
    const dataResults = apiResults(temporal, lon, lat, dateResults, progress)
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
            }
        
            // Append new content after 'progress' div
            const newContent = document.createElement('div');
            newContent.innerHTML = content;
            results.appendChild(newContent);

            // Append a download data button
            const newParagraph = document.createElement('p');
            const newButton = document.createElement('button');
            newButton.innerHTML = "Download Data";
            //newButton.addEventListener("click", () => downloadCSV(apiUrl));
            newParagraph.appendChild(newButton);
            results.appendChild(newParagraph);
        })
        .catch((error) => {
            progress.textContent = `Error occurred\n${error.header.messages}`;
        });

    newButton.addEventListener("click", () => downloadCSV(dataResults.apiUrl));
}