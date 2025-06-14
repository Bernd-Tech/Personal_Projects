const itemName = document.getElementById("item-name");
const itemPrice = document.getElementById("item-price");
const addToCartBtn = document.getElementById("addToCartBtn");
const totalPrice = document.getElementById("total-price");
const shoppingList = document.getElementById("shopping-list")

const selectedItems = [];
// let itemID = 0;
console.log(selectedItems)

const addToCart = () => {
    const item = itemName.value.trim();
    const price = parseFloat(itemPrice.value);
    const buyObject = {};
    // buyObject.id = itemID++;
    // buyObject.item = item;
    // buyObject.price = price;

    if (item && !isNaN(price) && price > 0) {
    selectedItems.push({item, price});
    displayItems(selectedItems);
    itemName.value = "";
    itemPrice.value = "";
    } else (
        alert("Please enter valid inputs.")
    )
}

const displayItems = (array) => {
    shoppingList.innerHTML = "";
    let sum = 0;

    array.forEach((listItem, index) => {
        sum += listItem.price;
        const shoppingItem = document.createElement("li");
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove Item";

        removeBtn.addEventListener("click", () => {
            shoppingList.innerHTML = "";
            selectedItems.splice(index, 1);
            displayItems(selectedItems)
            console.log(selectedItems)
        })


        shoppingItem.textContent = `${listItem.item} - $${listItem.price}`;
        shoppingItem.appendChild(removeBtn);
        shoppingList.appendChild(shoppingItem)
    })

    totalPrice.textContent = sum;
    console.log(selectedItems)
}

addToCartBtn.addEventListener("click", addToCart)
console.log(selectedItems)