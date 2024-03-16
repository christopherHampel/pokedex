function init() {
    load20Pokemon();
}

let startIndex = 1;
let endIndex = 21;
let amountLoadedPokemon = 20;
let currentPokemons = [];

const BACKGROUND_COLORS = {
    grass: '#9BCC50', 
    fire: '#FD7D24', 
    normal: '#A4ACAF', 
    water: '#4592C4',
    ground: '#AB9842',
    fairy: '#FDB9E9',
    electric: '#EED535',
    poison: '#B97FC9',
    bug: '#729F3F',
    psychic: '#F366B9',
    fighting: '#D56723',
    rock: '#A38C21',
    ghost: '#7B62A3'
}

async function load20Pokemon() {
    loadScreen();
    for(i = startIndex; i < endIndex; i ++){
        await loadPokemonFromAPI(i);
    }
    loadScreen();
}

async function load20MorePokemon() {
    startIndex = startIndex + amountLoadedPokemon;
    endIndex = endIndex + amountLoadedPokemon;
    await load20Pokemon(startIndex, endIndex);
}

async function loadPokemonFromAPI(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    let currentPokemon = await fetch(url);
    let currentPokemonAsJson = await currentPokemon.json();

    testFunction(currentPokemonAsJson, i);
    currentPokemons.push(currentPokemonAsJson);
    
    // renderPokemonCard(currentPokemonAsJson, i);
    // pokemonSecondType(currentPokemonAsJson, i);
    // let background = document.getElementById(`pokemonCardClass${i}`);
    // pokemonTypeBackgroundColor(currentPokemonAsJson, background);
    // console.log(currentPokemonAsJson);
}

function testFunction(currentPokemonAsJson, i) {
    renderPokemonCard(currentPokemonAsJson, i);
    
    let background = document.getElementById(`pokemonCardClass${i}`);
    pokemonTypeBackgroundColor(currentPokemonAsJson, background);
}

function renderPokemonCard(currentPokemonAsJson, i) {
    let pokemonCard = document.getElementById('pokemonCard');
    pokemonCard.innerHTML += returnHtmlPokemonCard(currentPokemonAsJson, i);
    pokemonSecondType(currentPokemonAsJson, i);
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

    bgColor = BACKGROUND_COLORS[pokemonType];
    background.style.backgroundColor = bgColor;
}

function showMoreDetails(i) {
    let backgroundMoreDetails = document.getElementById('backgroundMoreDetails');
    let pokemonCard = document.getElementById('pokemonCard');
    let body = document.getElementById('body');

    backgroundMoreDetails.classList.toggle('vs-hidden');
    body.classList.toggle('overflow-hidden');
    if(!backgroundMoreDetails.classList.contains('vs-hidden')) {
        renderSinglePokemon(i);
    }
}

function renderSinglePokemon(i) {
    let currentPokemon = currentPokemons[i - 1];
    let fieldForMoreDetails = document.getElementById('fieldMoreDetails');
    let pokemonCard = document.getElementById('pokemonCard');

    fieldForMoreDetails.innerHTML = returnHtmlMorePokemonDetails(currentPokemon, i);
    pokemonSecondType(currentPokemon, i);
    let largePokemnCardTop = document.getElementById(`largePokemonCardTop${i}`);
    pokemonTypeBackgroundColor(currentPokemon, largePokemnCardTop);
}

function about(i, whichHtml) {
    let container = document.getElementById(`fieldInformation${i}`)
    let pokemon = currentPokemons[i - 1];
    container.innerHTML = '';

    if(whichHtml == 'about') {
        x = returnPokemonAbout(pokemon);
    } else if(whichHtml == 'baseStats') {
        x = returnPokemonBaseStats(pokemon);
    } else if(whichHtml == 'evolution') {
        x = returnPokemonEvolution(pokemon);
    } else {
        x = returnPokemonMoves(pokemon);
    }
    container.innerHTML = x; 
}

async function movePokemonCard(i, lastOrNextPokemon) {
    let fieldForMoreDetails = document.getElementById('fieldMoreDetails');

    if(i < currentPokemons.length && lastOrNextPokemon == 'next') {
        i++;
    } else if(i > 1 && lastOrNextPokemon == 'last') {
        i--;
    } else if(i == currentPokemons.length) {
        await load20MorePokemon();
        i++;
    }
    fieldForMoreDetails.innerHTML = '';
    renderSinglePokemon(i);
    checkLastPokemon(i);
}

function checkLastPokemon(i) {
    let last = document.getElementById(`last${i}`);

    if(i == 1) {
        last.classList.add('vs-hidden');
    }
}

function notClose(event) {
    event.stopPropagation();
}

function loadScreen() {
    let background = document.getElementById('loadBackground');
    // let loadContent = document.getElementById('loadContent');

    background.classList.toggle('vs-hidden');
}

function filterPokemons() {
    let letters = document.getElementById('inputSearch').value;
    letters = letters.toLowerCase();
    let pokemonCard = document.getElementById('pokemonCard');
    pokemonCard.innerHTML = '';
    if(letters.length >= 3) {

    for(i = 0; i < currentPokemons.length; i++) {
        let pokemon = currentPokemons[i]['name'];
        let completePokemon = currentPokemons[i];
        if (pokemon.toLowerCase().includes(letters)) {
        pokemonCard.innerHTML += returnHtmlPokemonCard(completePokemon, i);
        let background = document.getElementById(`pokemonCardClass${i}`);
        pokemonTypeBackgroundColor(completePokemon, background);  
        }
    }
} else {
    for(i = 0; i < currentPokemons.length; i++) {
    let pokemon = currentPokemons[i];
    testFunction(pokemon, i);
    }
} 
}