function init() {
    load20Pokemon();
}

let startIndex = 1;
let endIndex = 21;
let amountLoadedPokemon = 20;
let currentPokemons = [];

async function load20Pokemon() {
    for(i = startIndex; i < endIndex; i ++){
        await loadPokemonFromAPI(i);
    }
}

function load20MorePokemon() {
    startIndex = startIndex + amountLoadedPokemon;
    endIndex = endIndex + amountLoadedPokemon;
    load20Pokemon(startIndex, endIndex);
}

async function loadPokemonFromAPI(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    let currentPokemon = await fetch(url);
    let currentPokemonAsJson = await currentPokemon.json();

    renderPokemonCard(currentPokemonAsJson, i);
    pokemonSecondType(currentPokemonAsJson, i);
    let background = document.getElementById(`pokemonCardClass${i}`);
    pokemonTypeBackgroundColor(currentPokemonAsJson, background);
    
    currentPokemons.push(currentPokemonAsJson);

    console.log(currentPokemonAsJson);
}

function renderPokemonCard(currentPokemonAsJson, i) {
    let pokemonCard = document.getElementById('pokemonCard');
    pokemonCard.innerHTML += returnHtmlPokemonCard(currentPokemonAsJson, i);
}

function pokemonSecondType(currentPokemonAsJson, i) {
    let currentPokemonTypes = currentPokemonAsJson['types'];

    if(currentPokemonTypes.length == 2) {
        showType2(currentPokemonTypes, i);
        }
}

function showType2(currentPokemonTypes, i) {
    let type2fromJson = currentPokemonTypes['1']['type']['name'];
    let typeField = document.getElementById(`type2${i}`);

    typeField.innerHTML = type2fromJson;
}

function pokemonTypeBackgroundColor(currentPokemonAsJson, background) {
    let pokemonType = currentPokemonAsJson['types']['0']['type']['name'];

    if(pokemonType == 'grass') {
        x = '#9BCC50';
    } else if(pokemonType == 'fire') {
        x = '#FD7D24';
    } else if(pokemonType == 'normal') {
        x = 'beige';
    } else if(pokemonType == 'water') {
        x = '#4592C4';
    } else {
        x = '#729F3F';
    }
    background.style.backgroundColor = x;
}

function showMoreDetails(i) {
    let pokemonCard = document.getElementById('pokemonCard');
    let backgroundMoreDetails = document.getElementById('backgroundMoreDetails');
    let fieldForMoreDetails = document.getElementById('fieldMoreDetails');
    let currentPokemon = currentPokemons[i - 1];
    pokemonCard.classList.toggle('position-fixed');


    backgroundMoreDetails.classList.toggle('vs-hidden');
    if(!backgroundMoreDetails.classList.contains('vs-hidden')) {
        fieldForMoreDetails.innerHTML = returnHtmlMorePokemonDetails(currentPokemon, i);
        pokemonSecondType(currentPokemon, i);
        let largePokemnCardTop = document.getElementById(`largePokemonCardTop${i}`);
        pokemonTypeBackgroundColor(currentPokemon, largePokemnCardTop);
    }
}

function returnHtmlPokemonCard(currentPokemon, i) {
    return `
    <div onclick="showMoreDetails(${i})" id="pokemonCardClass${i}" class="pokemon-card">
        <div class="flex-column pd-16">
            <div>${currentPokemon['name']}</div>
            <div class="">#${currentPokemon['id'].toString().padStart(3, '0')}</div>
        </div>

        <div class="pokemon-card-rightside">
            <div class="pokemon-types pd-16">
                <span>${currentPokemon['types']['0']['type']['name']}</span>
                <span id="type2${i}"></span>
            </div>
            <div class="pokemon-main-image" id="pokemonImage">
                <img class="pokemon-image" src="${currentPokemon['sprites']['other']['home']['front_shiny']}">
            </div>
        </div>
    </div>`
}

function returnHtmlMorePokemonDetails(currentPokemon, i) {
    return `
    <div id="largePokemonCardTop${i}" class="large-pokemoncard-top">
        <div class="flex-column pd-16 width-100-percent">
            <div>${currentPokemon['name']}</div>
            <div class="pokemon-types pd-16">
                <span>${currentPokemon['types']['0']['type']['name']}</span>
                <span id="type2${i}"></span>
            </div>
            <div class="">#${currentPokemon['id'].toString().padStart(3, '0')}</div>
        </div>
        <div class="pokemon-main-image">
            <img class="pokemon-image-big" src="${currentPokemon['sprites']['other']['home']['front_shiny']}">
        </div>
    </div>

    <div class="large-pokemoncard-bottom">
        <div class="links-for-pokemoncard">
            <a href="#" onclick="about(${i}, 'about')">About</a>
            <a href="#" onclick="about(${i}, 'baseStats')">Base Stats</a>
            <a href="#">Evolution</a>
            <a href="#">Moves</a>
        </div>
        <div id="fieldInformation${i}"></div>
    </div>
`
}

function about(i, whichHtml) {
    let container = document.getElementById(`fieldInformation${i}`)
    let pokemon = currentPokemons[i];
    container.innerHTML = '';

    if(whichHtml == 'about') {
    container.innerHTML = `<div>${pokemon['name']}</div>`
    } else if( whichHtml == 'baseStats') {
        container.innerHTML = `<div>${pokemon['height']}</div>`
    }
}

function notClose(event) {
    event.stopPropagation();
}