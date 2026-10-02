const input = document.getElementById("ingredientInput");
const makeButton = document.getElementById("makeButton");
const finishButton = document.getElementById("finishButton");
const restartButton = document.getElementById("restartButton");

const message = document.getElementById("message");
const sandwichList = document.getElementById("sandwichList");
const progress = document.getElementById("progress");
const challengeMessage = document.getElementById("challengeMessage");
const score = document.getElementById("score");

let sandwich = [];

let challenge = [];

let scoreValue = 0;


fetch("ingredients.json")
    .then((response) => {

        if (!response.ok) {
            throw new Error("Could not load ingredients.");
        }

        return response.json();
    })
    .then((data) => {

        const challenges = [
            ["bread", "chicken", "cheese", "lettuce"],
            ["bread", "beef", "cheese", "tomato"],
            ["bread", "chicken", "lettuce", "tomato"],
            ["bread", "tuna", "cheese", "lettuce"]
        ];

        const randomIndex = Math.floor(
            Math.random() * challenges.length
        );

        challenge = challenges[randomIndex];

        challengeMessage.textContent =
            challenge.join(", ");
    })
    .catch((error) => {

        message.textContent = error.message;

    });


makeButton.addEventListener("click", () => {

    const ingredient = input.value
        .toLowerCase()
        .trim();

    if (ingredient === "") {

        message.textContent =
            "Enter an ingredient.";

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
                    "That ingredient is not available."
                );
            }

            if (sandwich.includes(ingredient)) {

                message.textContent =
                    "You already added that ingredient.";

                return;
            }

            sandwich.push(ingredient);

            const item = document.createElement("li");

            item.textContent = ingredient;

            sandwichList.appendChild(item);

            input.value = "";

            updateProgress();

            if (challenge.includes(ingredient)) {

                scoreValue += 10;

                message.textContent =
                    "Correct ingredient.";

            } else {

                scoreValue -= 5;

                message.textContent =
                    "That ingredient is not part of the challenge.";
            }

            score.textContent =
                `Score: ${scoreValue}`;
        })
        .catch((error) => {

            message.textContent =
                error.message;

        });
});


finishButton.addEventListener("click", () => {

    if (sandwich.length === 0) {

        message.textContent =
            "Your sandwich has no ingredients.";

        return;
    }

    let correctIngredients = 0;

    for (let i = 0; i < challenge.length; i++) {

        if (sandwich.includes(challenge[i])) {

            correctIngredients++;
        }
    }

    if (correctIngredients === challenge.length) {

        scoreValue += 50;

        message.textContent =
            "You completed the challenge.";

    } else {

        message.textContent =
            `You got ${correctIngredients} out of ${challenge.length} ingredients correct.`;
    }

    score.textContent =
        `Final Score: ${scoreValue}`;
});


restartButton.addEventListener("click", () => {

    sandwich = [];

    scoreValue = 0;

    sandwichList.innerHTML = "";

    message.textContent = "";

    score.textContent = "";

    updateProgress();

    input.value = "";
});


function updateProgress() {

    progress.textContent =
        `${sandwich.length} ingredients added`;
}
