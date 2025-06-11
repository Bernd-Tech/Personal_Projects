// ✅ Function Name: fetchRandomUsers
// This is an async function that fetches 10 random users from an API

// 1️⃣ Use fetch() with 'await' to send a GET request to https://randomuser.me/api/?results=10
// 2️⃣ Await the JSON response and store it in a variable called 'data'
// 3️⃣ Return only the 'results' array (which contains the 10 users)

// ✅ Function Name: createUserCard
// This function builds and returns a DOM element for a single user

// 1️⃣ Create a <div> element and give it the class 'user-card'
// 2️⃣ Create an <img> element and set its src to the user's large picture
// 3️⃣ Set the image's alt text to the user's full name
// 4️⃣ Create another <div> with the class 'user-info'
// 5️⃣ Inside this div, create an <h2> element showing the user's full name
// 6️⃣ Also create a <p> element showing the user's email
// 7️⃣ Append the <h2> and <p> into the 'user-info' div
// 8️⃣ Append the <img> and 'user-info' div into the 'user-card' div
// 9️⃣ Return the final 'user-card' element

// ✅ Function Name: displayUsers
// This function calls fetchRandomUsers and displays the results in the HTML

// 1️⃣ Call fetchRandomUsers() and store the result in a variable named 'users'
// 2️⃣ Select the element with the ID 'user-container' (this is where cards will go)
// 3️⃣ Loop through each user in the 'users' array
//    - For each user, call createUserCard(user)
//    - Append the card to the 'user-container'

// ✅ Final Step:
// Call displayUsers() at the bottom so everything runs when the page loads

const userContainer = document.getElementById("user-container")
userContainer.classList.add("container")
const loadUsers = document.getElementById("load-users")

const fetchRandomUsers = async () => {
    userContainer.innerHTML = "";
       await axios
        .get("https://randomuser.me/api/?results=10")
        .then((response) => {
            const users = response.data.results;
            console.log(users)
            displayUsers(users)
        })
        .catch((error) => {console.error(error)})
}

const createUserCard = (user) => {
    const userCard = document.createElement("div");
    userCard.classList.add("user-card")
    
    const userImage = document.createElement("img");
    userImage.src = user.picture.large;
    userImage.alt = `${user.name.first} ${user.name.last}`;
    
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML = `
        <h2>${userImage.alt}</h2>
        <p>${user.email}</p>
    `;

    userCard.appendChild(userImage);
    userCard.appendChild(userInfo);
    
    return userCard
}

const displayUsers = (array) => {
    array.forEach((user) => {
        const card = createUserCard(user);
        userContainer.appendChild(card)
    })
}

loadUsers.addEventListener("click", () => {
    fetchRandomUsers()
})

const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
document.head.appendChild(script);
script.onload = fetchRandomUsers;