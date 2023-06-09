export function getDateResults(temporal) {
    const dateResults = {};
  
    if (temporal === 'Year') {
        dateResults.Year = document.getElementById('year-year').value;
    } else if (temporal == 'Month') {
        dateResults.Year = document.getElementById('month-year').value;
        dateResults.Month = document.getElementById('month-month').value;
    } else if (temporal == 'Day') {
        dateResults.Year = document.getElementById('day-year').value;
        dateResults.Month = document.getElementById('day-month').value;
        dateResults.Day = document.getElementById('day-day').value;
    } else if (temporal == 'Custom') {
        dateResults.Year1 = document.getElementById('startYear').value;
        dateResults.Month1 = document.getElementById('startMonth').value;
        dateResults.Day1 = document.getElementById('startDay').value;
        dateResults.Year2 = document.getElementById('endYear').value;
        dateResults.Month2 = document.getElementById('endMonth').value;
        dateResults.Day2 = document.getElementById('endDay').value;
    }

    return dateResults;
}

export function apiResults(indicator, temporal, lon, lat, dateResults) {
    
    let apiUrl = "";
    
    if (temporal == "Year" || temporal == "Month") {
        apiUrl = `https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=${indicator}&community=RE&longitude=${lon}&latitude=${lat}&start=${dateResults.Year}&end=${dateResults.Year}&time-standard=lst&format=JSON&user=byuiwddchigham`;
    } else if (temporal == "Day") {
        let month = dateResults.Month.toString().padStart(2, '0');
        let day = dateResults.Day.toString().padStart(2, '0');
        apiUrl = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=${indicator}&community=RE&longitude=${lon}&latitude=${lat}&start=${dateResults.Year}${month}${day}&end=${dateResults.Year}${month}${day}&time-standard=lst&format=JSON&user=byuiwddchigham`;
    } else if (temporal == "Custom") {
        let month1 = dateResults.Month1.toString().padStart(2, '0');
        let day1 = dateResults.Day1.toString().padStart(2, '0');
        let month2 = dateResults.Month2.toString().padStart(2, '0');
        let day2 = dateResults.Day2.toString().padStart(2, '0');
        apiUrl = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=${indicator}&community=RE&longitude=${lon}&latitude=${lat}&start=${dateResults.Year1}${month1}${day1}&end=${dateResults.Year2}${month2}${day2}&time-standard=lst&format=JSON&user=byuiwddchigham`;
    }
    if (indicator == "PRECTOTCORR" && (temporal == "Year" || temporal == "Month")) {
        apiUrl = apiUrl.replace("PRECTOTCORR", "PRECTOTCORR_SUM");
    } else if ((indicator == "WS2M" || indicator == "T2M") && (temporal == "Year" || temporal == "Month" || temporal == "Day")) {
        apiUrl = apiUrl.replace(indicator, `${indicator},${indicator}_MIN,${indicator}_MAX`);
    }
    
    return apiUrl;
}

export async function apiRequest(apiUrl, dateResults, progress) {
    progress.textContent = "Running...";

    const promise = await fetch(apiUrl)
        .then((response) => response.json())
        .then((jsonData) => {
            progress.textContent = "Done";
            return { jsonData, dateResults, apiUrl };
        })
        .catch((error) => {
            console.error("Error:", error);
            throw error;
        });
    
    return promise;
}