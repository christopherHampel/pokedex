let startIndex = 1;
let endIndex = 21;
let amountLoadedPokemon = 20;
let currentPokemons = [];
let searchPokemon = [];
let condition = '';

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

function init() {
    load20Pokemon();
}

async function load20Pokemon() {
    loadScreen();
    for(i = startIndex; i < endIndex; i ++){
        await loadPokemonFromAPI(i);
        filterPokemons();
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

    createPokemonCard(currentPokemonAsJson, i);
    currentPokemons.push(currentPokemonAsJson);
    console.log(currentPokemonAsJson);
}

function createPokemonCard(currentPokemonAsJson, i) {
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
    let body = document.getElementById('body');
    i++;

    backgroundMoreDetails.classList.toggle('vs-hidden');
    body.classList.toggle('overflow-hidden');
    if(!backgroundMoreDetails.classList.contains('vs-hidden')) {
        renderSinglePokemon(i);
        checkLastPokemon(i);
        defineButton('', false, false, i);
    }
}

function renderSinglePokemon(i) {
    let currentPokemon = currentPokemons[i - 1];
    let fieldForMoreDetails = document.getElementById('fieldMoreDetails');

    fieldForMoreDetails.innerHTML = returnHtmlMorePokemonDetails(currentPokemon, i);
    pokemonSecondType(currentPokemon, i);

    let largePokemnCardTop = document.getElementById(`largePokemonCardTop${i}`);
    pokemonTypeBackgroundColor(currentPokemon, largePokemnCardTop);
}

function about(i, whichHtml) {
    let canvasField = document.getElementById(`canvasField${i}`);
    canvasField.innerHTML = '';

    if(whichHtml == 'about' && condition == '') {
        defineButton('about', true, false, i);
    } else if(whichHtml == 'baseStats') {
        togglePokemonCard(i);
        renderChart(i, canvasField);
        defineButton('baseStats', false, true, i);
    } else if(whichHtml == 'about' && condition == 'baseStats') {
        togglePokemonCard(i);
        defineButton('about', true, false, i);
    }
}

function defineButton(whichCondition, first, second, i) {
    let container = document.getElementById(`fieldInformation${i}`);
    let pokemon = currentPokemons[i - 1];
    let aboutLink = document.getElementById(`aboutLink${i}`);
    let statsLink = document.getElementById(`statsLink${i}`);
    condition = whichCondition;
    aboutLink.disabled = first;
    statsLink.disabled = second;
    container.innerHTML = '';

    if(whichCondition == 'about') {
        container.innerHTML = returnPokemonAbout(pokemon);
    }
}

function togglePokemonCard(i) {
    let pokemonCardBottom = document.getElementById(`largePokemonCardBottom${i}`);
    let pokemonMainImage = document.getElementById(`pokemonMainImage${i}`);

    pokemonCardBottom.classList.toggle('mg-top-170');
    pokemonMainImage.classList.toggle('vs-hidden')
}

async function movePokemonCard(i, lastOrNextPokemon) {
    if(i < currentPokemons.length && lastOrNextPokemon == 'next') {
        i++;
    } else if(i > 1 && lastOrNextPokemon == 'last') {
        i--;
    } else if(i == currentPokemons.length) {
        await load20MorePokemon();
        i++;
    }
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
    background.classList.toggle('vs-hidden');
}

function filterPokemons() {
    let letters = document.getElementById('inputSearch').value;
    letters = letters.toLowerCase();
    let pokemonCard = document.getElementById('pokemonCard');
    pokemonCard.innerHTML = '';

    searchPokemon.splice(0, searchPokemon.length);
    if(letters.length >= 3) {
        for(i = 0; i < currentPokemons.length; i++) {
            checkIncludesSearch(i, letters);
        }
    } else {
        elseForfilterPokemon();
    } 
}

function checkIncludesSearch(i, letters) {
    let pokemon = currentPokemons[i]['name'];
    let completePokemon = currentPokemons[i];
    let btnArea = document.getElementById('btnArea')

    if (pokemon.toLowerCase().includes(letters)) {
        ifForcheckIncludesSearch(i, completePokemon)
    } 
    else if(searchPokemon == 0) {
        btnArea.innerHTML = returnNoPokemon();
    }
}

function ifForcheckIncludesSearch(i, completePokemon) {
    pokemonCard.innerHTML += returnHtmlPokemonCard(completePokemon, i);
    let background = document.getElementById(`pokemonCardClass${i}`);
    pokemonTypeBackgroundColor(completePokemon, background);
    searchPokemon.push(completePokemon);
    btnArea.innerHTML = returnNoPokemon();
}

function elseForfilterPokemon() {
    for(i = 0; i < currentPokemons.length; i++) {
        let pokemon = currentPokemons[i];
        createPokemonCard(pokemon, i);
    }
    loadButton();
}

function loadButton() {
    let btnArea = document.getElementById('btnArea')
    btnArea.innerHTML = returnBtnAreaStart();
}