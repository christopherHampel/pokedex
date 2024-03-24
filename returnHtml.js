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
        <div class="pokemon-main-image" id="pokemonMainImage${i}">
            <img id="last${i}" onclick="movePokemonCard(${i}, 'last')" class="icon" src="./img/thin-chevron-arrow-left-icon.png" alt="Last Pokemon">
            <img class="pokemon-image-big" src="${currentPokemon['sprites']['other']['home']['front_shiny']}">
            <img onclick="movePokemonCard(${i}, 'next')" class="icon" src="./img/line-angle-right-icon.png" alt="Next Pokemon">
        </div>
    </div>

    <div class="large-pokemoncard-bottom" id="largePokemonCardBottom${i}">
        <div class="links-for-pokemoncard">
            <button class="btn-pokemoncard" id="aboutLink${i}" onclick="about(${i}, 'about')">About</button>
            <button class="btn-pokemoncard" id="statsLink${i}" onclick="about(${i}, 'baseStats')">Base Stats</button>
        </div>

        <div id="fieldInformation${i}"></div>
        <div id="canvasField${i}"><canvas class="vs-hidden" id="myChart${i}"></canvas></div> 

    </div>`
}

function returnNoPokemon() {
    return `
    <div class="no-pokemon">
        <div>
            Didn't find your Pokemon? Please load 20 more Pokemon!
        </div>
        <button onclick="load20MorePokemon()">load Pokemon</button>
    </div>`;
}

function returnPokemonAbout(pokemon) {
    return `
    <div class="list-about">
        <li>Name: ${pokemon['name']}</li>
        <li>height: ${pokemon['height']}</li>
        <li>Weight: ${pokemon['weight']}</li>
    </div>
    <div class="width-33"></div>`;
}

function returnBtnAreaStart() {
return `
    <div class="d-flex-for-button">
        <div class="width-33"></div>
        <button onclick="load20MorePokemon()">load Pokemon</button>
        <a class="d-center" href="#"><img class="scroll-up" src="./img/app-1646212_640.png" alt="Arrow-Up"></a>
    </div>`
}
