import updateTemporalFields from "/wdd-individual/final-project/js/form-dates.js";//"/js/form-dates.js"

export default function getLocalStorage(key) {
    let data = JSON.parse(localStorage.getItem(key));

    if (data) {
        document.getElementById("lat").value = data.lat;
        document.getElementById("lon").value = data.lon;
        document.getElementById("indicator").value = data.indicator;
        document.getElementById("temporal").value = data.temporal;
        
        if (data.temporal === 'Year') {
            document.getElementById('year-year').value = data.dateResults.Year;
        } else if (data.temporal == 'Month') {
            document.getElementById('month-year').value = data. dateResults.Year;
            document.getElementById('month-month').value = data.dateResults.Month;
        } else if (data.temporal == 'Day') {
            document.getElementById('day-year').value = data.dateResults.Year;
            document.getElementById('day-month').value = data.dateResults.Month;
            document.getElementById('day-day').value = data.dateResults.Day;
        } else if (data.temporal == 'Custom') {
            document.getElementById('startYear').value = data.dateResults.Year1;
            document.getElementById('startMonth').value = data.dateResults.Month1;
            document.getElementById('startDay').value = data.dateResults.Day1;
            document.getElementById('endYear').value = data.dateResults.Year2;
            document.getElementById('endMonth').value = data.dateResults.Month2;
            document.getElementById('endDay').value = data.dateResults.Day2;
        }
    }
    updateTemporalFields();
    return data
}