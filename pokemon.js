const input = document.getElementById("search-input")
const btnSearch = document.getElementById("btn-search")
const imageStats = document.querySelector(".image-stats")
let pokemons = [];
let currPokemon = {};

// Fetch data from the API using async/await
async function fetchPokemons() {
  try {
    const response = await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon");
    const data = await response.json();
    pokemons = data.results;
    inputChecker(pokemons)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

//Fetach data async for the chosen pokemon
async function fetchspecificPokemon(currPokemon) {
    try {
        const response = await fetch(currPokemon.url);
        const data = await response.json();
        makeChanges(data)
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

//function to check if input is correct and also call the fetchSpecificPokemon if there

const inputChecker = (pokemons) => {
    if(!(pokemons.find((item)=>item.id==input.value) ||
    pokemons.find((item)=>item.name==input.value.toLowerCase()))){
        alert("Pokemon Not Found");
        reset();
        return;
    }
    
    currPokemon = pokemons.find((item)=>item.name==input.value.toLowerCase())?pokemons.find((item)=>item.name==input.value.toLowerCase()):pokemons.find((item)=>item.id==input.value);
    
    fetchspecificPokemon(currPokemon);
    return;
}


// do all the changes needed
const makeChanges=(data)=>{
    
    const type = data.types.map((item)=>{return `<span class="type" style="background-color:${typeColor(item.type.name)}">${item.type.name.toUpperCase()}</span>`}).join('');
    
    imageStats.innerHTML = `<div class="left-side-info">
    <span id="name">${data.name.toUpperCase()}</span>
    <span id="id">#${data.id}</span>
    </div>
    <div class="left-side-info">
    <span id="weight">Weight: ${data.weight}</span>
    <span id="height">Height: ${data.height}</span>
    </div>
    <img src=${data.sprites.front_default} alt="image">
    <div class="type-pokemon">
    ${type}
    </div>`
    
    data.stats.forEach((item)=>{document.getElementById(`${item.stat.name}`).innerText=item.base_stat;})
}

function typeColor(type) {
    switch (type) {
      case 'normal':
        return '#A8A878'; // RGB: (168, 168, 120)
      case 'fire':
        return '#F08030'; // RGB: (240, 128, 48)
      case 'water':
        return '#6890F0'; // RGB: (104, 144, 240)
      case 'electric':
        return '#F8D030'; // RGB: (248, 208, 48)
      case 'grass':
        return '#78C850'; // RGB: (120, 200, 80)
      case 'ice':
        return '#98D8D8'; // RGB: (152, 216, 216)
      case 'fighting':
        return '#C03028'; // RGB: (192, 48, 40)
      case 'poison':
        return '#A040A0'; // RGB: (160, 64, 160)
      case 'ground':
        return '#E0C068'; // RGB: (224, 192, 104)
      case 'flying':
        return '#A890F0'; // RGB: (168, 144, 240)
      case 'psychic':
        return '#F85888'; // RGB: (248, 88, 136)
      case 'bug':
        return '#A8B820'; // RGB: (168, 184, 32)
      case 'rock':
        return '#B8A038'; // RGB: (184, 160, 56)
      case 'ghost':
        return '#705898'; // RGB: (112, 88, 152)
      case 'dragon':
        return '#7038F8'; // RGB: (112, 56, 248)
      case 'dark':
        return '#705848'; // RGB: (112, 88, 72)
      case 'steel':
        return '#B8B8D0'; // RGB: (184, 184, 208)
      case 'fairy':
        return '#EE99AC'; // RGB: (238, 153, 172)
      default:
        return '#FFFFFF'; // Default color (white) if type is not found
    }
}  

const reset = () =>{
    imageStats.innerHTML = '';
    // data.stats.forEach((item)=>{document.getElementById(`${item.stat.name}`).innerText='';}) // wont work
    document.querySelectorAll(".stat-num").forEach((item)=>item.innerText='');
}



//Event Listeners
btnSearch.addEventListener('click', () => {
    fetchPokemons();
});

addEventListener("keydown",(event)=>{if (event.code=="Enter") fetchPokemons()})



