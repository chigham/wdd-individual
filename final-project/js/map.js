require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/MapImageLayer",
    "esri/widgets/LayerList",
    "esri/widgets/Expand"
], function(Map, MapView, MapImageLayer, LayerList, Expand) {

    // Create a map object
    var map = new Map({
        basemap: "satellite"
    });

    // Create a MapView object
    var view = new MapView({
        container: "map",
        map: map,
        center: [-98.5833, 39.8333], // Set the initial center coordinates
        zoom: 4 // Set the initial zoom level
    });

    // Create the layer
    var layer = new MapImageLayer({
        url: "https://arcgis.asdc.larc.nasa.gov/server/rest/services/POWER/power_901_monthly_meteorology_utc/ImageServer",
        sublayers: [
            {
                id: 0,
                visible: true
            }
        ]
    });

    // Add the layer to the map
    map.add(layer);

    // Create the LayerList widget
    var layerListWidget = new LayerList({
        view: view,
        container: document.createElement("div")
    });

    // Create an Expand widget for the LayerList
    var layerListExpand = new Expand({
        view: view,
        content: layerListWidget.domNode,
        expanded: true
    });

    // Add the LayerList widget to the top-left corner of the view
    //view.ui.add(layerListExpand, "top-left");
});