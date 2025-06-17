// 🟡 Task 1: Define an async function named getPokemon that accepts one parameter: pokemonName
// This function should fetch data about a Pokémon using the API and display it as a card on the page

// 🟡 Task 2: Validate the input to ensure it's a non-empty string
// Check if the input exists AND is a string using typeof
// If the input is invalid, throw an error with a message

// 🟡 Task 3: Use fetch() to request data from the PokéAPI using the lowercase Pokémon name
// Use template literals to insert the Pokémon name in the URL
// Use toLowerCase() to avoid issues with capitalization

// 🟡 Task 4: If the response is not successful (e.g., 404), throw an error with the status code
// Use response.ok to check the status
// If it's not OK, throw a new Error with the status number

// 🟡 Task 5: Convert the successful response to a usable JavaScript object
// Use await with response.json() to parse the data

// 🟡 Task 6: Extract values from the Pokémon object
// Get name, height, weight, and the front_default image from the sprite object

// 🟡 Task 7: Create an array of type names (e.g., "electric", "fire")
// Use map() to loop through the types array and get each type name

// 🟡 Task 8: Create an array of sound objects with type and URL
// Use Object.entries() to turn the cries object into an array of [key, value] pairs
// Map each pair to an object with soundType and sound properties

// 🟡 Task 9: Create the card container <div> and apply styling class
// Use document.createElement("div")
// Add the "pokemon-card" class using classList.add()

// 🟡 Task 10: Create the image element and set its source to the sprite URL
// Create an <img> element and set the src attribute to the image URL
// Append the image to the card

// 🟡 Task 11: Create a paragraph with Pokémon info and style it
// Create a <p> element
// Add margin and font size using style properties - margin 5px & fontSize 12px.
// Use innerHTML to insert name, height (converted to meters), weight, and type list
// Append the paragraph to the card

// 🟡 Task 12: Create a container for cry sound buttons

// 🟡 Task 13: Loop through the sounds array and create a button for each cry
// Use a for loop to go through each sound object
// Create a <button> for each sound
// Set the button’s label to the sound type (e.g., "legacy")

// 🟡 Task 14: When clicked, play the cry using the Audio object
// Add an event listener to the button
// Use new Audio(url) to create an audio instance
// Use .play() to play the sound

// Append each button to the sound container

// 🟡 Task 15: Append the sound button container to the main card

// 🟡 Task 16: Append the entire Pokémon card to the visible output container******
// Use document.getElementById("output").appendChild(card)