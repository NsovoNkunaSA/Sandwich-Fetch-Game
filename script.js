const input = document.getElementById("ingredientInput");
const addButton = document.getElementById("addButton");
const makeButton = document.getElementById("makeButton");

const message = document.getElementById("message");
const sandwichList = document.getElementById("sandwichList");

let sandwich = [];


addButton.addEventListener("click", () => {

    const ingredient = input.value.toLowerCase().trim();

    if (ingredient === "") {
        message.textContent = "Please enter an ingredient.";
        return;
    }


    fetch("ingredients.json")

        .then((response) => {

            if (!response.ok) {
                throw new Error("Could not fetch ingredients.");
            }

            return response.json();

        })

        .then((data) => {

            if (!data.ingredients.includes(ingredient)) {

                throw new Error(
                    `${ingredient} is not available!`
                );

            }


            sandwich.push(ingredient);

            message.textContent =
                ` ${ingredient} added!`;

            const item = document.createElement("li");

            item.textContent = ingredient;

            sandwichList.appendChild(item);

            input.value = "";

        })

        .catch((error) => {

            message.textContent =
                ` ${error.message}`;

        });

});


makeButton.addEventListener("click", () => {

    if (sandwich.length === 0) {

        message.textContent =
            " Your sandwich is empty!";

        return;
    }


    message.textContent =
        ` Sandwich ready! ${sandwich.join(", ")}`;

});
