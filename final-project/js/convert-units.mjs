export default function convertUnits(value, units) {
    if (units == "mm") {
        let inches = value / 25.4;
        let feet = Math.floor(inches / 12);
        let remainingInches = inches % 12;

        let mm = value.toFixed(2) + " mm<br>"
        inches = inches.toFixed(2) + " in<br>";
        feet = feet + " ft " + remainingInches.toFixed(2) + " in<br>"

        return mm + inches + feet
    } else if (units == "mps") {
        let feetPerSecond = value * 3.28083989501;
        let milesPerHour = value * 2.23694;
        let kilometersPerHour = value * 3.6;
        let knot = value * 1.94384;

        let mps = value.toFixed(2) + " meters/second<br>";
        feetPerSecond = feetPerSecond.toFixed(2) + " feet/second<br>";
        milesPerHour = milesPerHour.toFixed(2) + " miles/hour<br>";
        kilometersPerHour = kilometersPerHour.toFixed(2) + " km/hour<br>";
        knot = knot.toFixed(2) + " knots<br>";

        return mps + feetPerSecond + milesPerHour + kilometersPerHour + knot
    } else if (units == "degC") {
        let degF = value * (9/5) + 32;
        let degK = value + 273.15;

        let degC = value.toFixed(2) + "&deg C<br>";
        degF = degF.toFixed(2) + "&deg F<br>";
        degK = degK.toFixed(2) + "&deg K<br>";
        
        return degC + degF + degK
    }
}