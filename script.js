function init() {
    loadPokemon();
}

async function loadPokemon(){
    let url = 'https://pokeapi.co/api/v2/pokemon/feraligatr';
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let pokemonName = responseAsJson['name'];
    // let pokemonType = responseAsJson['types']['0']['type']['name'];
    let pokemonImage = responseAsJson['sprites']['front_shiny'];  
    let pokemonCard = document.getElementById('pokemonCard');
    pokemonCard.innerHTML = '';
    // let currentImage = document.getElementById('pokemonImage');
    // currentImage.innerHTML = `<img src=\"${pokemonImage}">`;
    pokemonCard.innerHTML += returnHtmlPokemonCard(responseAsJson, pokemonImage);
    console.log(responseAsJson);
}

function returnHtmlPokemonCard(currentPokemon, pokemonImage) {
    return `
    <div class="background">
    <div class="pokemon-card">
        <div class="flex-column pd-16">
            <h3>${currentPokemon['name']}</h3>
            <div class="flex-column">
                <span>${currentPokemon['types']['0']['type']['name']}</span>
                <span>Text</span>
            </div>
        </div>
        <div class="pokemon-card-rightside">
            <div class="pd-8">#${currentPokemon['id']}</div>
            <div class="pokemon-main-image" id="pokemonImage">
                <img src="${pokemonImage}">
            </div>
        </div>
    </div>
</div>`
}