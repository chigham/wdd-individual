import creditPOWER from "/final-project/js/modify-attribution.mjs";

require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/MapImageLayer",
    "esri/layers/GraphicsLayer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/Graphic"
], function(Map, MapView, MapImageLayer, GraphicsLayer, SimpleMarkerSymbol, Graphic) {

    const latInput = document.getElementById('lat');
    const lonInput = document.getElementById('lon');
    
    // Create a map object
    var map = new Map({
        basemap: "satellite"
    });

    // Create a MapView object
    var view = new MapView({
        container: "map",
        map: map,
        center: [0, 10], // Set the initial center coordinates
        zoom: 3, // Set the initial zoom level
    });
    
    // Create the layer
    var layer = new MapImageLayer({
        url: "https://arcgis.asdc.larc.nasa.gov/server/rest/services/POWER/power_901_climatology_meteorology_utc/ImageServer",
        sublayers: [
            {
                id: 0,
                visible: true
            }
        ]
    });

    // Add the layer to the map
    map.add(layer);

    // Create a graphics layer to hold the manually placed point
    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    // Create a symbol for the point
    const pointSymbol = new SimpleMarkerSymbol({
        color: [255, 0, 0],  // Red color for the point
        size: 10,
    });

    // Function to handle the map click event
    function handleMapClick(event) {
        // Clear the existing graphics from the graphics layer
        graphicsLayer.removeAll();

        // Get the clicked map coordinates
        const { latitude, longitude } = event.mapPoint;

        // Create a graphic for the clicked point
        const pointGraphic = new Graphic({
            geometry: event.mapPoint,
            symbol: pointSymbol
        });

        // Add the graphic to the graphics layer
        graphicsLayer.add(pointGraphic);

        // Update the input fields with the latitude and longitude values
        latInput.value = latitude.toFixed(2);
        lonInput.value = longitude.toFixed(2);
    }

    // Listen for the click event on the map view
    view.on("click", handleMapClick);
});

setTimeout(function() {
    creditPOWER();
}, 3000);