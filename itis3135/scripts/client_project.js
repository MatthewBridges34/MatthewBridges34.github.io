// Client project JavaScript for Petal Path
// This file controls the shared navigation highlight and the three required dynamic interactions.

document.addEventListener("DOMContentLoaded", () => {
    // Highlights the current page in the shared navigation bar.
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".client-nav a");

    navLinks.forEach((link) => {
        const linkPage = link.getAttribute("href").split("/").pop();

        if (linkPage === currentPage) {
            link.style.backgroundColor = "#6e9b75";
            link.setAttribute("aria-current", "page");
        }
    });

    // Dynamic Functionality #1:
    // This section creates a random flower storytelling tip on the home page.
    const flowerTipButton = document.getElementById("flower-tip-button");
    const flowerTipOutput = document.getElementById("flower-tip-output");

    const flowerTips = [
        "Use flowers in photos to communicate emotion.",
        "Bright flowers suggest celebration and joy.",
        "Wilted flowers may symbolize grief or reflection.",
        "Flowers at memorials often represent remembrance.",
        "Flower colors can help set the tone of a story."
    ];

    if (flowerTipButton && flowerTipOutput) {
        flowerTipButton.addEventListener("click", () => {
            const randomIndex = Math.floor(Math.random() * flowerTips.length);
            flowerTipOutput.textContent = flowerTips[randomIndex];
        });
    }

    // Dynamic Functionality #2:
    // This dropdown lets the user select a flower and then displays that flower's meaning.
    const flowerMeaningSelect = document.getElementById("flower-meaning-select");
    const flowerMeaningOutput = document.getElementById("flower-meaning-output");

    const flowerMeanings = {
        rose: "Roses often represent love, remembrance, admiration, and respect.",
        lily: "Lilies often represent peace, renewal, purity, and mourning.",
        sunflower: "Sunflowers often represent hope, resilience, warmth, and positivity.",
        tulip: "Tulips often represent renewal, fresh beginnings, and seasonal change.",
        daisy: "Daisies often represent simplicity, innocence, and natural beauty.",
        carnation: "Carnations often represent gratitude, devotion, remembrance, and formal tribute."
    };

    if (flowerMeaningSelect && flowerMeaningOutput) {
        flowerMeaningSelect.addEventListener("change", () => {
            const selectedFlower = flowerMeaningSelect.value;

            if (selectedFlower === "") {
                flowerMeaningOutput.innerHTML = "<h4>Selected Flower Meaning</h4><p>Select a flower to see its meaning here.</p>";
            } else {
                const flowerName = flowerMeaningSelect.options[flowerMeaningSelect.selectedIndex].text;
                flowerMeaningOutput.innerHTML = `<h4>${flowerName}</h4><p>${flowerMeanings[selectedFlower]}</p>`;
            }
        });
    }

    // Dynamic Functionality #3:
    // This code creates the gallery image preview/lightbox.
    const galleryImages = document.querySelectorAll(".lightbox-image");
    const galleryLightbox = document.getElementById("gallery-lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.getElementById("lightbox-close");

    if (galleryImages.length > 0 && galleryLightbox && lightboxImage && lightboxCaption && lightboxClose) {
        galleryImages.forEach((image) => {
            image.addEventListener("click", () => {
                lightboxImage.src = image.src;
                lightboxImage.alt = image.alt;
                lightboxCaption.textContent = image.getAttribute("data-caption");
                galleryLightbox.classList.remove("hidden");
            });
        });

        lightboxClose.addEventListener("click", () => {
            galleryLightbox.classList.add("hidden");
        });
    }
});
