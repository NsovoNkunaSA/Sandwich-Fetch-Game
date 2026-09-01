
const button = document.getElementById("makeSandwich");
const sandwich = document.getElementById("sandwich");

button.addEventListener("click", () => {

    fetch("ingredients.json")

        .then((response) => {

            if (!response.ok) {
                throw new Error("Could not fetch ingredients!");
            }

            return response.json();
        })

        .then((data) => {

            const bread = data.bread[0];
            const meat = data.meat[0];
            const cheese = data.cheese[0];
            const sauce = data.sauce[0];
            const vegetables = data.vegetables[0];

            sandwich.innerHTML = `
                <h2>🥪 Your Sandwich</h2>

                <p> ${bread}</p>
                <p> ${meat}</p>
                <p> ${cheese}</p>
                <p> ${vegetables}</p>
                <p> ${sauce}</p>

                <h3>Enjoy your sandwich! </h3>
            `;

        })

        .catch((error) => {

            sandwich.innerHTML = `
                <p> ${error.message}</p>
            `;

        });

});
