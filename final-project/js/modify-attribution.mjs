export default function creditPOWER() {
    const esriAttribution = document.querySelector(".esri-attribution__sources");
    const esriEarthstar = document.querySelector(".esri-attribution__powered-by");
    const attributionContainer = esriAttribution.parentElement;

    // Modify the content
    let geographics = esriAttribution.innerHTML;
    let linkToPOWER = '<a href="https://power.larc.nasa.gov/" target="_blank" style="color:black;text-decoration:none;">NASA Prediction of Worldwide Energy Resources (POWER)</a>';
    esriAttribution.innerHTML = `Data by ${linkToPOWER}`;
    esriEarthstar.innerHTML = `${geographics} - ${esriEarthstar.innerHTML}`;

    // Add a class to the parent element for styling purposes
    attributionContainer.classList.add("parent-of-text-attributions");

    // All styling for these elements is accomplished using css in "/css/styles.css"
}