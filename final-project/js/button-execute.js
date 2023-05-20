import {apiResults, getDateResults} from "/js/power-api-results.mjs";

const form = document.getElementById('formElem');
form.addEventListener('submit', createSubmitData);

const output = document.getElementById('output');

function createSubmitData(event) {
    event.preventDefault(); // Prevent form submission

    // Get the form values
    const temporal = document.getElementById('temporal').value;
    const lon = document.getElementById('lon').value;
    const lat = document.getElementById('lat').value;
    const dateResults = getDateResults(temporal);

    // Call the apiResults function with the form values
    apiResults(temporal, lon, lat, dateResults, output)
        .then(({jsonData, dateResults}) => {
            console.log("Done");
        })
        .catch((error) => {
            output.textContent = `Error occurred\n${error.header.messages}`;
        });
}