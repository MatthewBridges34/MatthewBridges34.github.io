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
});