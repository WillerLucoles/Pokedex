const pokemonList = document.getElementById('pokemonList');
const searchInput = document.getElementById('searchInput');
const maxRecords = 151;
const limit = 151;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <section class="pokemon ${pokemon.type}" onclick="viewDetails(${pokemon.number})">
            <div class=Image_Container>
                <img src="${pokemon.photo}"alt="${pokemon.name}">
            </div>
            <div class="card">    
                <span class="number">${pokemon.number}</span>
                <h1 class="name">${pokemon.name}</h1>
                <div class="detail">
                    <div class="types">
                        ${pokemon.types.map((type) => `<p class="type ${type}">${type}</p>`).join('')}
                    </div>     
                </div>
            </div>    
        </section>
    `;
}

function loadPokemonItems(offset, limit, filterTerm) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const filteredPokemons = pokemons.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
            pokemon.type.toLowerCase().includes(filterTerm.toLowerCase()) ||
            pokemon.number.toString().includes(filterTerm)
        )

        const newHtml = filteredPokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML = newHtml;
    });
}


// Carrega todos os Pokémon inicialmente
loadPokemonItems(offset, limit, '');

// Adiciona um evento de input ao campo de pesquisa
searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value;
    loadPokemonItems(offset, limit, searchTerm);
});

