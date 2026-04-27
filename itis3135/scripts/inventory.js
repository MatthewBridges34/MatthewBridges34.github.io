document.addEventListener("DOMContentLoaded", function () {
    const rows = document.querySelectorAll("tbody tr");
    const noteSection = document.querySelector(".card:last-of-type p");

    let lowestQuantity = Infinity;
    let lowestFlower = "";

    rows.forEach(function (row) {
        const flowerName = row.cells[0].textContent;
        const quantityText = row.cells[2].textContent;

        const quantity = parseInt(quantityText);

        if (quantity < lowestQuantity) {
            lowestQuantity = quantity;
            lowestFlower = flowerName;
        }

        row.addEventListener("mouseenter", function () {
            row.style.backgroundColor = "#fce8f0";
        });

        row.addEventListener("mouseleave", function () {
            row.style.backgroundColor = "";
        });
    });

    if (noteSection) {
        noteSection.textContent =
            lowestFlower +
            " should be restocked first because it currently has the lowest available quantity (" +
            lowestQuantity +
            ").";
    }

    console.log("Petal Path Inventory Loaded");
});