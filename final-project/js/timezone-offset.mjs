//const moment = require('moment-timezone');

export default function timeZoneOffset(lat, lon) {
    //const timezone = moment.tz.guess();
    const offset = moment.tz(lat + ',' + lon).utcOffset() / 60;
    
    return offset;
}

//const mom = moment.tz.guess();

/*export default function timeZoneOffset(lat, lon) {
    // Get the time zone name for the given lat lon
    const timeZone = moment.tz.guess(lat, lon);
    
    // Get the current time in the specified time zone
    const currentTime = moment().tz(timeZone);

    // Get the time zone offset in minutes
    const offsetInMinutes = currentTime.utcOffset();

    // Convert the offset to hours
    const offsetInHours = offsetInMinutes / 60;

    return offsetInHours;
}*/