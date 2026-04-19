document.addEventListener("DOMContentLoaded", () => {
  const generateHtmlButton = document.getElementById("generate-html");

  generateHtmlButton.addEventListener("click", () => {
    if (!window.IntroFormApp.validateForm()) {
      document.getElementById("intro-form").reportValidity();
      return;
    }

    const data = window.IntroFormApp.collectFormData();
    const htmlString = window.IntroFormApp.buildLiteralHtmlString(data);

    window.IntroFormApp.renderCodeOutput(
      "Introduction HTML",
      "language-html",
      htmlString
    );
  });
});