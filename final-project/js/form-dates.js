var temporalSelect = document.getElementById("temporal");

temporalSelect.addEventListener("change", updateTemporalFields);

export default function updateTemporalFields() {
    var selectedOption = temporalSelect.options[temporalSelect.selectedIndex].value;
    
    // Hide all field sets
    document.getElementById("yearFields").style.display = "none";
    document.getElementById("monthFields").style.display = "none";
    document.getElementById("dayFields").style.display = "none";
    document.getElementById("customFields").style.display = "none";
    
    // Show the relevant field set based on the selected option
    if (selectedOption === "Year") {
        document.getElementById("dateRangePrompt").textContent = "Choose a year (1981-2021): ";
        document.getElementById("dateRangePrompt").style.display = "block";
        document.getElementById("yearFields").style.display = "block";
    } else if (selectedOption === "Month") {
        document.getElementById("dateRangePrompt").textContent = "Choose a month (1981-2021): ";
        document.getElementById("dateRangePrompt").style.display = "block";
        document.getElementById("monthFields").style.display = "block";
    } else if (selectedOption === "Day") {
        document.getElementById("dateRangePrompt").textContent = "Choose a day (1981-2022): ";
        document.getElementById("dateRangePrompt").style.display = "block";
        document.getElementById("dayFields").style.display = "block";
    } else if (selectedOption === "Custom") {
        document.getElementById("dateRangePrompt").innerHTML = "Choose a date range. For <br>best results, limit range to <br>5 years or less (2001-2021): ";
        document.getElementById("dateRangePrompt").style.display = "block";
        document.getElementById("customFields").style.display = "block";
    }
}