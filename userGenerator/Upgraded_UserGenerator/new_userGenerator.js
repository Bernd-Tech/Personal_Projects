const userSearchInput = document.getElementById("user-search");
const fetchMultipleUserBtn = document.getElementById("fetch-multiple-btn");
const fetchSingleUserBtn = document.getElementById("fetch-one-btn");
const userContainer = document.getElementById("user-container");
const toggleThemeBtn = document.getElementById("toggle-theme")
const nationalityDropDown = document.getElementById("nationality-filter")
const userStatsContainer = document.getElementById("user-stats-container");
const averageAge = document.getElementById("average-age")

let users = [];
console.log(users)

const fetchRandomUsers = (count) => {
   axios.get(`https://randomuser.me/api/?results=${count}`)
  .then((response) => {
    users = response.data.results;
    console.log(users)
    displayUsers(users)
  })
  .catch ((error) => {
    console.error(error);
    userContainer.innerHTML = "Users could not be loaded: Error " + error;
  })
}

const createUserCard = (user) => {
    const userCard = document.createElement("div")
    userCard.className = "user-card";
    
    const userImg = document.createElement("img");
    userImg.alt = `${user.name.first} ${user.name.last}`;
    userImg.src = user.picture.large;

    const userInfo = document.createElement("div");
    userInfo.className = "user-info";    
    userInfo.innerHTML = `
        <h2>${userImg.alt}</h2>
        <p><strong>Age:</strong> ${user.dob.age}</p>
        <p><strong>Country:</strong> ${user.location.country}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phonenumber:</strong> ${user.phone}</p>
    `;

    userCard.appendChild(userImg);
    userCard.appendChild(userInfo);
    return userCard
}

const displayUsers = (userArray) => {
    userContainer.innerHTML = "";
    userArray.forEach((user) => {
        const fetchedUser = createUserCard(user);
        userContainer.appendChild(fetchedUser)
    })
    countGender(userArray)
    calculateAverageAge(userArray)
    userStatsContainer.style.display = "flex";
}

//filters fetched users based on entered value in search input field. For case-insensitive approach I used toLowercase()
const filterUserName = () => {
    const targetUser = userSearchInput.value.toLowerCase();
    const filteredUser = users.filter((u) => {
        const targetName = `${u.name.first} ${u.name.last}`.toLowerCase();
        return targetName.includes(targetUser);
    })
    displayUsers(filteredUser)
}

//filters fetched users based on selected country.
const filterNationality = () => {
  const targetUsers = nationalityDropDown.value.toLowerCase();
  const filteredUsers = users.filter((u) => { 
    const targetNationality = u.location.country.toLowerCase();
    return targetNationality.includes(targetUsers);
  })
  if (targetUsers === "default") {
      displayUsers(users)
    } else {
      displayUsers(filteredUsers)
    }
}

//Accesses gender value of fetched users array -> adds the amount with each iteration/loop in genderCount object -> redefines inner HTML of "gender" divs
const countGender = (userArray) => {
  
  let genderCount = {
    male: 0,
    female: 0,
    divers: 0
  };

  const maleCount = document.getElementById("male-count");
  const femaleCount = document.getElementById("female-count");
  const diversCount = document.getElementById("divers-count");

  userArray.forEach((u) => {
    if (u.gender === "male") {
      genderCount.male++;
    } else if (u.gender === "female") {
      genderCount.female++
    } else if (u.gender === "divers") {
      genderCount.divers++
    }
  })

    maleCount.innerHTML = `<i class="fa-solid fa-mars gender"> : ${genderCount.male}</i>`;
    femaleCount.innerHTML = `<i class="fa-solid fa-venus gender"> : ${genderCount.female}</i>`;
    diversCount.innerHTML = `<i class="fa-solid fa-genderless gender"> : ${genderCount.divers}</i>`;

}

// Calculates average age of fetched users
const calculateAverageAge = (userArray) => {
  let sum = 0;
  userArray.forEach((u) => {
    const userAge = u.dob.age;
    sum += userAge;
  })
  averageAge.textContent = `ø Age ≈ ${Math.floor(sum / userArray.length)}`;
}


fetchMultipleUserBtn.addEventListener("click", () => {fetchRandomUsers(10)})
fetchSingleUserBtn.addEventListener("click", () => {fetchRandomUsers(1)})
userSearchInput.addEventListener("input", filterUserName)
nationalityDropDown.addEventListener("change", filterNationality)

// switches between default and .dark color theme
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if(document.body.classList.contains("dark")) {
    toggleThemeBtn.innerHTML = `
      <i class="fa-regular fa-sun"></i>
    `
  } else {
    toggleThemeBtn.innerHTML = `
    <i class="fa-regular fa-moon"></i>`
  }
})

// dynamically loading axios via CDN
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
document.head.appendChild(script);