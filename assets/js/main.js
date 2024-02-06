const pokemonList = document.getElementById('pokemonList');
const searchInput = document.getElementById('searchInput');
const maxRecords = 151;
const limit = 151;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
            <li class="pokemon ${pokemon.type}">
                <div class= 'img-conteiner'>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
                <span class="number">${pokemon.number.toString() .padStart(3,'0')}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>   
                </div>
            </li>
    `;
}

function loadPokemonItems(offset, limit, filterTerm) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      const filteredPokemons = pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
          pokemon.type.toLowerCase().includes(filterTerm.toLowerCase()) ||
          pokemon.number.toString().includes(filterTerm)
      );

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
