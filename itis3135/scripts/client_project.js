// Highlights the current page in the shared navigation bar
document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".client-nav a");

    navLinks.forEach((link) => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.style.backgroundColor = "#6e9b75";
            link.setAttribute("aria-current", "page");
        }
    });

    // Dynamic Functionality #1:
    // This section creates a random flower storytelling tip on the home page.
    // When the user clicks the button, JavaScript updates the paragraph text
    // with a randomly selected tip from the flowerTips array.
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
});

// Dynamic Functionality #3:
// This code creates the gallery image preview/lightbox.
// When a user clicks a gallery image, JavaScript updates the preview image,
// updates the caption, and removes the hidden class so the preview appears.
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