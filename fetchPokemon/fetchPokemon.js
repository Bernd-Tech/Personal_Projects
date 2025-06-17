const pokemonSearchInput = document.getElementById("pokemon-search-input");
const pokemonDisplayContainer = document.getElementById("pokemon-display-container");
const fetchBtn = document.getElementById("fetch-btn");
const pokemonCard = document.createElement("div");
pokemonCard.classList.add("pokemon-card");
const pokeInfo = document.createElement("div");

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
        console.error(`${error}: Pokemon could not be loaded`);
        pokemonDisplayContainer.innerText = "Response undefined: Pokemon could not be loaded.";
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
    
    const imgContainer = document.createElement("div");
    const pokemonImg = document.createElement("img");
    pokemonImg.src = pokeObject.sprites.front_default;
    pokemonImg.alt = pokeObject.name;
    imgContainer.appendChild(pokemonImg);

    pokeInfo.style.display = "flex";
    pokeInfo.style.flexDirection = "column";
    pokeInfo.style.gap = "5px";
    pokeInfo.innerHTML = `
        <p>Height: ${(pokeObject.height / 10).toFixed(2) + "m"}</p>
        <p>Weight: ${pokeObject.weight}</p>
    `;

    const typeInfo = document.createElement("p");
    typeInfo.innerText = `Types: ${[...types].join(", ")}`;

    // types.forEach((type) => {
    //     const individualType = document.createElement("span")
    //     individualType.textContent = type;
    //     typeInfo.appendChild(individualType);
    // })
    pokeInfo.appendChild(typeInfo);

    pokemonCard.innerHTML = `
    <p>${name} #${pokeObject.id}</p>
    `;
    pokemonCard.appendChild(imgContainer);
    pokemonCard.appendChild(pokeInfo);
    playPokemonCry(pokeObject);
    pokemonDisplayContainer.appendChild(pokemonCard)

}

const playPokemonCry = (object) => {
    const cryContainer = document.createElement("div");
    cryContainer.style.display = "flex";
    cryContainer.style.gap = "10px";
    const sounds = Object.entries(object.cries);

    if(!sounds) {
        console.log("No sound available.");
        return;
    }

    // Using array destructuring to locally declare varibales that store sound's two-element arrays as values
    sounds.forEach(([cryName, sound]) => {
        
        if(!sound) {
          console.log("No sound available.");
          return;
        }

        const cryBtn = document.createElement("button");
        const cry = new Audio(sound);
        cryBtn.innerText = cryName + " cry";
        // using addEventListener and not .onclick property because otherwise will play sound when fetchPokemon() is called!
        cryBtn.addEventListener("click", () => {
            cry.play()
        })
        cryContainer.appendChild(cryBtn);
    })
    pokeInfo.appendChild(cryContainer);
}

fetchBtn.addEventListener("click", fetchPokemon)