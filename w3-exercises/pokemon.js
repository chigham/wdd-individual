const inputElement = document.querySelector('input[name="myInput"]');
const button = document.querySelector('button');
const outputDiv = document.getElementById('output');


const url = "https://pokeapi.co/api/v2/pokemon/";
let results = null;
async function getPokemon(url) {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        doStuff(data);
    }
}

function doStuff(data) {
    results = data;
    console.log("first: ", results);
    /*
    results = data;
    console.log('first: ', results);
    results.results.forEach((pokemon) => {
        const div = document.createElement('div');
        div.textContent = pokemon.name;
        document.querySelector('main').appendChild(div);
            // assumes you have a <main> element in your HTML document
    });
    */
}

getPokemon(url);
console.log("second: ", results);


// Added this for fun
function getPokedexInfo() {
    const pokemonName = inputElement.value.toLowerCase();
  
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => response.json())
      .then(data => {
        // Extract the desired information from the response
        const pokemonId = data.id;
        const pokemonType = data.types[0].type.name;
        const pokemonImage = data.sprites.front_default;
  
        // Display the information in the output div
        outputDiv.innerHTML = `
          <h2>${pokemonName}</h2>
          <p>ID: ${pokemonId}</p>
          <p>Type: ${pokemonType}</p>
          <img src="${pokemonImage}" alt="${pokemonName} Image">
        `;
    })
    .catch(error => {
      // Handle any errors that occur during the API request
      outputDiv.innerHTML = 'Error: Unable to fetch Pokémon information.';
      console.error(error);
    });
}
button.addEventListener('click', getPokedexInfo);
