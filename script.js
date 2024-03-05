function init() {
    loadPokemon();
}

async function loadPokemon(){
    let url = 'https://pokeapi.co/api/v2/pokemon/feraligatr';
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let pokemonName = responseAsJson['name'];
    let pokemonImage = responseAsJson['sprites']['front_shiny'];   
    
    showCurrentPokemon(pokemonName, pokemonImage);

    console.log(responseAsJson);
}

function showCurrentPokemon(pokemonName, pokemonImage) {
    let currentName = document.getElementById('pokemonName');
    let currentImage = document.getElementById('pokemonImage');
    
    currentName.innerHTML = '';
    currentName.innerHTML = `${pokemonName}`

    currentImage.innerHTML = '';
    currentImage.innerHTML = `<img src=\"${pokemonImage}">`;
}