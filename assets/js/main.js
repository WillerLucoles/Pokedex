const pokemonList = document.getElementById('pokemonList')
const searchInput = document.getElementById('searchInput')

const maxRecords = 151
const limit = 151
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)


function search() {
    const value = searchInput.value.toLowerCase();
    const pokemonItems = document.querySelectorAll('.pokemon');
  
    pokemonItems.forEach((item) => {
      const itemName = item.querySelector('.name').innerText.toLowerCase();
      const itemNumber = item.querySelector('.number').innerText.toLowerCase();
      const itemTypes = Array.from(item.querySelectorAll('.type')).map((type) => type.innerText.toLowerCase());
  
      if (
        itemName.includes(value) ||
        itemNumber.includes(value) ||
        itemTypes.some((type) => type.includes(value))
      ) {
        item.classList.remove('hide');
      } else {
        item.classList.add('hide');
      }
    });
  }
  
  searchInput.addEventListener('input', search);
  loadPokemonItems(offset, limit);
