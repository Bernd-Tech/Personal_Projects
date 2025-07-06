const password = document.getElementById("password");
const lengthInput = document.getElementById("length");
const history = document.getElementById("history");


const characters = {
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^/[]{}!_*':;%&()=+#.,,.-#+",
}


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("generate-pw").addEventListener("click", () => {
        const optLower = document.getElementById("lower").checked;
        const optUpper = document.getElementById("upper").checked;
        const optNumbers = document.getElementById("numbers").checked;
        const optSymbols = document.getElementById("symbols").checked;
        const length = parseInt(lengthInput.value);

        if (length < 4 || length > 32 || isNaN(length)) {
        alert("Please enter a number between 4 and 32 to determine the length of the password.");
        lengthInput.value = "";
        return
        }

        //Have to make sure that at least one character option is checked, otherwise password bugs
        if(!optLower && !optUpper && !optNumbers && !optSymbols) {
            alert("Please select at least one of the options to generate a password.");
            console.error("No option selected!")
            return;
        }

        generatePassword(length, optLower, optUpper, optNumbers, optSymbols);
        displayPasswordHistory();

         lengthInput.value = "";
    })
    document.getElementById("clear-history").addEventListener("click", () => {
            localStorage.clear();
            displayPasswordHistory();
            password.value = "";
            alert("All saved passwords have been successfully deleted.");
        })
})


const generatePassword = (length, optLower, optUpper, optNumbers, optSymbols) => {
    let newPassword = "";
    let characterPool = "";

    if (optLower) characterPool += characters.lower;
    if (optUpper) characterPool += characters.upper;
    if (optNumbers) characterPool += characters.numbers;
    if (optSymbols) characterPool += characters.symbols;
    console.log(characterPool)

    //Math.min() returns the smaller value and Math.max() the larger value -> passwordLength will be between 4 and 32. If higher than 32: 32 will be selected, if lower than 4: 4 will be selected.
    const passwordLength = Math.min(Math.max(length, 4), 32);
    console.log(`The password will have ${passwordLength} slots.`)

    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * characterPool.length);
        console.log(`The random number is ${randomNumber}`)
        newPassword += characterPool[randomNumber];
    }

    password.value = newPassword;
    password.select();
    savePassword(newPassword);
    console.log(`The new generated password is: ${newPassword}`)
}


const savePassword = (newPassword) => {
    const passwords = JSON.parse(localStorage.getItem("passwords")) || [];
    passwords.unshift(newPassword);

    if (passwords.length > 5) {
        passwords.splice(5)
    }
    localStorage.setItem("passwords", JSON.stringify(passwords));
}


const displayPasswordHistory = () => {
    history.innerHTML = "";
    const passwords = JSON.parse(localStorage.getItem("passwords"));
    if (!passwords) {
        return;
    }
    passwords.forEach((pw) => {
        const singlePassword = document.createElement("li");
        singlePassword.textContent = pw;
        history.appendChild(singlePassword);
    })
}
