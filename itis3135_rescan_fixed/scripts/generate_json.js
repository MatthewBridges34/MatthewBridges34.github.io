document.addEventListener("DOMContentLoaded", () => {
  const generateJsonButton = document.getElementById("generate-json");

  generateJsonButton.addEventListener("click", () => {
    if (!window.IntroFormApp.validateForm()) {
      document.getElementById("intro-form").reportValidity();
      return;
    }

    const data = window.IntroFormApp.collectFormData();
    const jsonObject = window.IntroFormApp.buildJsonObject(data);
    const jsonString = JSON.stringify(jsonObject, null, 2);

    window.IntroFormApp.renderCodeOutput(
      "Introduction JSON",
      "language-json",
      jsonString
    );
  });
});