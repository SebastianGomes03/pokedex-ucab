const url = "https://pokeapi.co/api/v2/pokemon/";

const generationStartIds = {
    1: 151,
	2: 251,  
	3: 386,
	4: 493,
	5: 649,
	6: 721,
	7: 809,
	8: 898,
	9: 1025,
};

const generationSelect = document.getElementsByClassName("gen_select")[0]; 

const spriteGrandElement = document.querySelector(".pokemon_3Dmodel > img");
const pokemonList = document.querySelector(".pokemon_list");
const shinyButton = document.querySelector(".shiny_button");

let isShiny = false;

document.addEventListener('DOMContentLoaded', function() {
    const firstGenStartId = generationStartIds[1];
    fetchPokemonDetails(firstGenStartId);
});

shinyButton.addEventListener("click", () => {
	toggleShiny();
});

window.addEventListener("load", getPokeData(1, 151));

function getPokeData(firstPoke, lastPoke) {
	setTimeout(() => {
		const pokemonData = [];

		const promises = [];

		for (let i = firstPoke; i <= lastPoke; i++) {
			const finalUrl = url + i;
			const promise = fetch(finalUrl)
				.then((response) => response.json())
				.then((data) => {
					pokemonData[i - firstPoke] = data;
				});
			promises.push(promise);
		}
		Promise.all(promises).then(() => {
			pokemonList.innerHTML = "";
			pokemonData.forEach((data) => {
				generateCard(data, lastPoke, isShiny);
			});
			betterPokemonCards();
			selectPokemon();

			if (pokemonData.length > 0) {
                const firstPokemonData = pokemonData[0];
                document.querySelector(".pokemon").classList.add("pokemon_active");
                fetchPokemonDetails(firstPokemonData.id); 
            }
		});
	}, 200);
}

function generateCard(data, lastPoke) {
	const dex_number = data.id;
	const name = data.name;
	const spriteGrand = data.sprites.other["official-artwork"].front_default;
	const spriteGrandShiny = data.sprites.other["official-artwork"].front_shiny;
	const spriteIcon =
		data.sprites.versions["generation-viii"].icons.front_default;

	pokemonList.innerHTML += ` 
	<li class="pokemon${dex_number == lastPoke ? " pokemon_active" : ""}" data-sprite-grand="${spriteGrand}" data-shiny="${spriteGrandShiny}" data-id="${dex_number}">
  		<div>
  			<div class="pokemon_sprite">
  				<img src="${spriteIcon}" alt="sprite">
  			</div>
  			<p class="pokemon_num">No. <span class="pokemon_num_field">${dex_number}</span></p>
  		</div>
  		<p class="pokemon_name">${name}</p>
  		<div class="pokeball">
  			<img src="../img/pokeball.png" alt="pokeball">
  		</div>
  	</li>
  `;
}

function betterPokemonCards() {
	let pokemons = document.querySelectorAll(".pokemon");
	pokemons.forEach((pokemon) => {
		let dex_entry = pokemon.firstElementChild.lastElementChild.lastElementChild;
		if (dex_entry.innerText.length == 1) {
			dex_entry.innerText = "00" + dex_entry.innerText;
		} else if (dex_entry.innerText.length == 2) {
			dex_entry.innerText = "0" + dex_entry.innerText;
		}
	});
}

function selectPokemon() {
	let pokemons = document.querySelectorAll(".pokemon");
	pokemons.forEach((pokemon) => {
		pokemon.addEventListener("click", () => {
			determinePokemonSprite(pokemon, isShiny);
			pokemons.forEach((pokemon) => {
				pokemon.classList.remove("pokemon_active");
			});
			const pokemonId = pokemon.getAttribute("data-id");
            fetchPokemonDetails(pokemonId);
			pokemon.classList.add("pokemon_active");
		});
	});
}

function fetchPokemonDetails(pokemonId) {
    fetch(`${url}${pokemonId}`)
        .then(response => response.json())
        .then(data => {
            const speciesUrl = data.species.url; 
            fetch(speciesUrl) 
                .then(response => response.json())
                .then(speciesData => {
                    const evolutionChainUrl = speciesData.evolution_chain.url; 
                    fetch(evolutionChainUrl)
                        .then(response => response.json())
                        .then(evolutionData => {
							updateInfoBox(data, evolutionData);
							updateSpriteGrandElement(data);
                        });
                });
        })
        .catch(error => console.error("Error fetching data: ", error));
}

function updateSpriteGrandElement(pokemonData) {
    const spriteGrand = pokemonData.sprites.other["official-artwork"].front_default;
    const spriteGrandShiny = pokemonData.sprites.other["official-artwork"].front_shiny;
    if (isShiny) {
        spriteGrandElement.src = spriteGrandShiny;
    } else {
        spriteGrandElement.src = spriteGrand;
    }
    spriteGrandElement.setAttribute("data-id", pokemonData.id);
}

function updateInfoBox(pokemonData, evolutionData) {
    const infoBox = document.querySelector(".pokemon_info_box");
    let evolutionChain = [];
    let currentEvolution = evolutionData.chain;
    do {
        evolutionChain.push(currentEvolution.species.name);
        currentEvolution = currentEvolution.evolves_to[0];
    } while (currentEvolution && currentEvolution.hasOwnProperty('species'));

	infoBox.innerHTML = `
		<div class="column">
        	<p>Type: ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
        	<p>Height: ${pokemonData.height}</p>
			</div>
		<div class="column">
        	<p>Weight: ${pokemonData.weight}</p>
        	<p>Abilities: ${pokemonData.abilities.map(ability => ability.ability.name).join(', ')}</p>
		</div>
		<div class="full_width">
        	<p>Evolution Chain: ${evolutionChain.join(' -> ')}</p>
		</div>
    `;
}

function determinePokemonSprite(pokemon, isShiny) {
	if (isShiny) {
		spriteGrandElement.src = pokemon.getAttribute("data-shiny");
	} else {
		spriteGrandElement.src = pokemon.getAttribute("data-sprite-grand");
	}
	console.log(isShiny);
}

function toggleShiny() {
	let pokemonSpriteLink =
		"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
	isShiny = !isShiny;
	let shinyButtonImage = document.querySelector(".shiny_button > img");
	shinyButtonImage.src =
		isShiny == true
			? "../img/shiny-stars-active.png"
			: "../img/shiny-stars.png";
	if (isShiny) {
		spriteGrandElement.src =
			pokemonSpriteLink +
			"shiny/" +
			spriteGrandElement.getAttribute("data-id") +
			".png";
	} else {
		spriteGrandElement.src =
			pokemonSpriteLink + spriteGrandElement.getAttribute("data-id") + ".png";
	}
}



