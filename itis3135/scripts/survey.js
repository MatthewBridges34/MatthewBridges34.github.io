document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const flower = document.getElementById("favorite-flower").value;
        const comments = document.getElementById("comments").value.trim();

        const uses = [];
        const checkboxes = document.querySelectorAll(
            'input[name="flower-use"]:checked'
        );

        checkboxes.forEach(function (box) {
            uses.push(box.value);
        });

        const frequencyChoice = document.querySelector(
            'input[name="frequency"]:checked'
        );

        const frequency = frequencyChoice
            ? frequencyChoice.value
            : "No selection";

        const surveyData = {
            customerName: name,
            customerEmail: email,
            favoriteFlower: flower,
            flowerUses: uses,
            purchaseFrequency: frequency,
            customerComments: comments
        };

        console.log("Petal Path Survey Submission");
        console.log(JSON.stringify(surveyData, null, 2));

        alert(
            "Thank you for completing the Petal Path Flower Survey!"
        );

        form.reset();
    });
});