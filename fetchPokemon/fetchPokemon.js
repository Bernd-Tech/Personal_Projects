const pokemonSearchInput = document.getElementById("pokemon-search-input");
const pokemonDisplayContainer = document.getElementById("pokemon-display-container");
const fetchBtn = document.getElementById("fetch-btn");

const fetchPokemon = async () => {
    try {
        pokemonDisplayContainer.innerHTML = "";
        const pokemonName = pokemonSearchInput.value.toLowerCase().trim();
        
        if (!pokemonName) throw new Error(`Can't find pokemon under entered value: "${pokemonName}"`);

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if(!response.ok) throw new Error("Response: " + response.state);
        const data = await response.json();
        console.log(data)

        displayPokemon(data)
        pokemonSearchInput.value = "";

    } catch (error) {
        console.error(`${error}: Pokemon could not be loaded`)
    }
}

const displayPokemon = (pokeObject) => {
    const name = pokeObject.name.charAt(0).toUpperCase() + pokeObject.name.slice(1);
    // console.log(name)
    const types = [];

    //property "types" in pokeObject is assigned to array -> need array iteration like forEach() to access nested target value
    pokeObject.types.forEach((pokeType) => {
        const target = pokeType.type.name; 
        types.push(target)
    })
    console.log(types)

    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");
    
    const imgContainer = document.createElement("div");
    const pokemonImg = document.createElement("img");
    pokemonImg.src = pokeObject.sprites.front_default;
    pokemonImg.alt = pokeObject.name;
    imgContainer.appendChild(pokemonImg);

    const pokeInfo = document.createElement("div");
    pokeInfo.innerHTML = `
        <p>Height: ${pokeObject.height}</p>
        <p>Weight: ${pokeObject.weight}</p>
    `;

    types.forEach((type) => {
        const typeInfo = document.createElement("p");
        typeInfo.textContent = `Types: ${type}`;
        pokeInfo.appendChild(typeInfo);
    })

    pokemonCard.innerHTML = `
    <p>${name}</p>
    `;
    pokemonCard.appendChild(imgContainer);
    pokemonCard.appendChild(pokeInfo);
    pokemonDisplayContainer.appendChild(pokemonCard)

}

fetchBtn.addEventListener("click", fetchPokemon)