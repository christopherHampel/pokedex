function returnHtmlPokemonCard(currentPokemon, i) {
    return `
    <div onclick="showMoreDetails(${i})" id="pokemonCardClass${i}" class="pokemon-card">
        <div class="flex-column pd-16">
            <div>${currentPokemon['name']}</div>
            <div class="">#${currentPokemon['id'].toString().padStart(3, '0')}</div>
        </div>

        <div class="pokemon-card-rightside">
            <div id="pokemonImage">
                <img class="pokemon-image" src="${currentPokemon['sprites']['other']['home']['front_shiny']}">
            </div>
            <div class="pokemon-types">
                <span class="pokemon-type">${currentPokemon['types']['0']['type']['name']}</span>
                <span id="type2${i}"></span>
            </div>
        </div>
    </div>`
}

function returnHtmlMorePokemonDetails(currentPokemon, i) {
    return `
    <div id="largePokemonCardTop${i}" class="large-pokemoncard-top">
        <div class="head-information pd-16 width-100-percent">
            <div>${currentPokemon['name']}</div>
            <div class="pokemon-types-big pd-16">
                <span>${currentPokemon['types']['0']['type']['name']}</span>
                <span id="type2${i}"></span>
            </div>
            <div class="">#${currentPokemon['id'].toString().padStart(3, '0')}</div>
        </div>
        <div class="pokemon-main-image">
            <img id="last${i}" onclick="movePokemonCard(${i}, 'last')" class="icon" src="./img/thin-chevron-arrow-left-icon.png" alt="Last Pokemon">
            <img class="pokemon-image-big" src="${currentPokemon['sprites']['other']['home']['front_shiny']}">
            <img onclick="movePokemonCard(${i}, 'next')" class="icon" src="./img/line-angle-right-icon.png" alt="Next Pokemon">
        </div>
    </div>

    <div class="large-pokemoncard-bottom">
        <div class="links-for-pokemoncard">
            <a href="#" onclick="about(${i}, 'about')">About</a>
            <a href="#" onclick="about(${i}, 'baseStats')">Base Stats</a>
            <a href="#" onclick="about(${i}, 'moves')">Moves</a>
        </div>

        <div id="fieldInformation${i}"></div>
    </div>`
}

function returnPokemonAbout(pokemon) {
    return `
    <div class="list-about">
        <li>Name: ${pokemon['name']}</li>
        <li>height: ${pokemon['height']}</li>
        <li>Weight: ${pokemon['weight']}</li>
    </div>
    <div class="width-33"></div>`
}

function returnPokemonBaseStats(pokemon) {
    return `<div>${pokemon['height']}</div>`
}

// function returnPokemonEvolution(pokemon) {
//     return ``
// }

function returnPokemonMoves(pokemon) {
    return ``
}