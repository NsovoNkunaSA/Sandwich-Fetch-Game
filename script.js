const input = document.getElementById("ingredientInput");
const makeButton = document.getElementById("makeButton");
const finishButton = document.getElementById("finishButton");

const message = document.getElementById("message");
const sandwichList = document.getElementById("sandwichList");

let sandwich = [];

makeButton.addEventListener("click", () => {

    const ingredient = input.value
        .toLowerCase()
        .trim();

    if (ingredient === "") {
        message.textContent = " Enter an ingredient.";
        return;
    }

    // FETCH THE INGREDIENTS
    fetch("ingredients.json")

        .then((response) => {

            if (!response.ok) {
                throw new Error("Could not fetch ingredients.");
            }

            return response.json();
        })

        .then((data) => {

            // CHECK IF INGREDIENT EXISTS
            if (!data.ingredients.includes(ingredient)) {

                throw new Error(
                    `${ingredient} is not available!`
                );
            }

            // INGREDIENT EXISTS
            sandwich.push(ingredient);

            const item = document.createElement("li");

            item.textContent = ingredient;

            sandwichList.appendChild(item);

            message.textContent =
                ` ${ingredient} added!`;

            input.value = "";

        })

        .catch((error) => {

            message.textContent =
                ` ${error.message}`;

        });

});


finishButton.addEventListener("click", () => {

    if (sandwich.length === 0) {

        message.textContent =
            " Your sandwich has no ingredients.";

        return;
    }

    message.textContent =
        ` Sandwich complete: ${sandwich.join(", ")}`;

});
