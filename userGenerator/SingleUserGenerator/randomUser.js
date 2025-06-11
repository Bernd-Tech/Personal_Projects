// ✅ Function Name: fetchUser
// This is an async function that fetches a single random user and displays the result

// 1️⃣ Use 'await fetch()' to send a GET request to 'https://randomuser.me/api/'
//    Store the response in a variable called 'response'

// 2️⃣ Check if the response is not OK using 'if (!response.ok)'
//    If it's not OK, throw an error with a message using 'throw new Error(...)'

// 3️⃣ Use 'await response.json()' to convert the raw response into a JavaScript object
//    Store the result in a variable called 'data'

// 4️⃣ Use 'document.getElementById("output")' to find the HTML element where you want to show the data
//    Use '.textContent' to set the content of that element to the stringified version of the data
//    Use 'JSON.stringify(data, null, 2)' to make the output pretty (indented)

// 5️⃣ Wrap everything in a try...catch block to handle potential errors
//    If an error happens, catch it and log it using 'console.error(error)'

// ✅ Function Name: fetchUser
// This function uses async/await to fetch a random user from the API and display it in the browser
const userPictureContainer = document.getElementById("userPictureContainer");
const userInfo = document.getElementById("userInfo");
const generateUserBtn = document. getElementById("generateUser")

const fetchUser = async () => {
    userPictureContainer.innerHTML = "";
    userInfo.innerHTML = "";

    try {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();

    const user = data.results[0];

    userInfo.innerHTML = `
    <p><strong>Name:</strong> ${user.name.first} ${data.results[0].name.last}</p>
    <p><strong>Age:</strong> ${user.dob.age}</p>
    <p><strong>Residence:</strong> ${user.location.city}, ${user.location.state}</p>
    <p><strong>Country:</strong> ${user.location.country}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    `
    const userPicture = document.createElement("img");
    userPicture.classList.add("picture");
    userPicture.src = data.results[0].picture.large;
    userPictureContainer.appendChild(userPicture);

    } catch (error) {
        console.error(error)
    }
    
}

generateUserBtn.addEventListener("click", fetchUser)
window.onload = fetchUser;