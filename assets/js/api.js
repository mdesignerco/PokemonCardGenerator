
let  randomInteger = function (pow) {
  return Math.floor(Math.random() * pow);
};

const key = randomInteger(250),
      urlAPI = `https://pokeapi.co/api/v2/pokemon/${key}`;
//console.log(key)
fetch(urlAPI)
	.then(response => response.json())
	.then(data => {/*console.log(data)*/
    let PokeName = document.querySelector('.pokeName'),
    pokeImg = document.querySelector('.pokeImage'),
    pokeElement = document.querySelector('.pokeHealth-element img'),
    pokeHealth = document.querySelector('.pokeHealth-tagNumber'),
    pokeStats = document.querySelectorAll('.pokestats'),
    stats = data.stats;

    PokeName.textContent = data.name;
    pokeImg.src = data.sprites.other.dream_world.front_default;
    pokeImg.alt = data.name;
    pokeElement.src = `./assets/images/${data.types[0].type.name}.svg`;
    pokeElement.alt = data.types[0].type.name;
    stats.forEach( (stat, key) => {
      if ( key === 0 ) {
        pokeHealth.textContent =  stat.base_stat;
      } else {
        pokeStats[key-1].textContent = stat.base_stat;
      }
    });
    pokeStats[5].textContent =  data.height;
    pokeStats[6].textContent =  data.weight;
  })
	.catch(err => console.error(err));


