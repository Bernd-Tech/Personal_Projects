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