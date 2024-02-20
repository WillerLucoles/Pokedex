// Função para visualizar detalhes de um Pokémon
function viewDetails(idPoke) {
    const modalPoke = document.querySelector('.modalPoke');
    if (modalPoke) {
        modalPoke.remove();
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${idPoke}`)
        .then((response) => response.json())
        .then((responseJson) => pokeApi.convertDetails(responseJson))
        .then((convertPokemon) => {
            const bodyDoc = document.querySelector('body');
            bodyDoc.innerHTML += pokeApi.viewDetails(convertPokemon);
        });
}

// Função para remover o modal
function removePokeDetails() {
    const modalPoke = document.querySelector('.modalPoke');
    modalPoke.remove();
}

// Função para visualizar os status do Pokémon
function viewStatus(statusPoke) {
    return statusPoke.map((statusI) => {
        const valueStatus = statusI.base_stat;
        const nameStatus = statusI.stat.name;

        return `
            <div class="statusBox">
                <h3 class="titleStatus">${nameStatus}</h3>
                <div class="box ${nameStatus}">${valueStatus}%</div>
            </div>`;
    }).join('');
}

// Função para visualizar os poderes do Pokémon
function viewPower(typePokemon) {
    return typePokemon.map((typePoke) => {
        const typeName = typePoke.type.name;
        return `<li class="typeItem ${typeName}">${typeName}</li>`;
    }).join('');
}

// Convert details pokemon
pokeApi.convertDetails = (pokemon) =>{
    const imagePokemon = pokemon.sprites.other.dream_world.front_default
    const pokemonDetail = new PokemonDetails(
        pokemon.name,
            pokemon.order,
                pokemon.height,
                    pokemon.weight,
                        pokemon.stats,
                            pokemon.types,
                                imagePokemon)
    
    return pokemonDetail
}

// View details pokemons
pokeApi.viewDetails = (pokemon)=>{
    const typeColor = pokemon.types[0].type.name
    
    // Formatando peso e altura
    pokemon.weight = pokemon.weight / 10 
    pokemon.height = pokemon.height / 10


    return `
        <section class="modalPoke ${typeColor}">
            <div class="header">           
                <div class="buttonRemove">
                    <button onclick="removePokeDetails()" class="btnRemove">
                    Sair
                    </button>
                </div>
                <h1 class="namePoke">${pokemon.name}</h1>
                <span class="number">${pokemon.order}</span>
            </div>
           
            <div class="image">
                <img class="imagePoke" src="${pokemon.photo}" alt="${pokemon.name}">
            </div>

            <div class="deitalsAndPower">
                <div class="detailsBox">
                    <h2 class="detailsTitle">
                        Details
                    </h2>
                    
                    <div class="detailsWidth">
                        <span class="detailText ${typeColor}" id="width">
                            ${pokemon.height} M
                        </span>
                        <span class="detailText ${typeColor}" id="height">
                            ${pokemon.weight} KG
                        </span>
                    </div>
                </div>

                <div class="types">
                    <h2>
                        Powers Pokemon
                    </h2>
                    <ul class="typesList">
                        ${viewPower(pokemon.types)}
                    </ul>
                </div>
            </div>


            <div class="statusPoke">
                <h1 class="namePoke">
                    Status ${pokemon.name}
                </h1>
                ${viewStatus(pokemon.status)}
            </div>        

            
        </section>
    `
}