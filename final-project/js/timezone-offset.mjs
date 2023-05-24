export default function timeZoneOffset(lat, lon) {
  return new Promise(function(resolve, reject) {
      require([
          "esri/geometry/Point",
          "esri/tasks/GeometryService",
          "esri/tasks/support/ProjectParameters",
          "esri/config",
      ], function(Point, GeometryService, ProjectParameters, esriConfig) {
          // Set up the geometry service URL
          esriConfig.geometryServiceUrl = "https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer";

          // Create a point representing the lat lon coordinate
          var point = new Point(lon, lat);

          // Create a geometry service instance
          var geometryService = new GeometryService();

          // Project the point to obtain the correct spatial reference
          var projectParams = new ProjectParameters({
              geometries: [point],
              outSpatialReference: { wkid: 4326 } // WGS84 spatial reference
          });

          geometryService.project(projectParams)
              .then(function(projectedGeometries) {
                  // Get the projected point
                  var projectedPoint = projectedGeometries[0];

                  // Get the time zone offset based on the projected point
                  var timeZoneOffset = projectedPoint.getDateTimeOffset(new Date());

                  console.log("Time Zone Offset:", timeZoneOffset);

                  // Resolve the promise with the timeZoneOffset value
                  resolve(timeZoneOffset);
              })
              .catch(function(error) {
                  console.error("Error:", error);

                  // Reject the promise with the error
                  reject(error);
              });
      });
  });
}

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
    });