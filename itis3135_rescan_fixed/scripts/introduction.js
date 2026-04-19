const DEFAULT_COURSES = [
  {
    department: "ITIS",
    number: "3135",
    name: "Web-Based Application Design and Development",
    reason: "Replace with your real reason."
  },
  {
    department: "MATH",
    number: "1241",
    name: "Calculus I",
    reason: "Replace with your real reason."
  }
];

const DEFAULT_LINKS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/" },
  { name: "GitHub", href: "https://github.com/" },
  { name: "GitHub Pages", href: "https://pages.github.com/" },
  { name: "freeCodeCamp", href: "https://www.freecodecamp.org/" },
  { name: "Codecademy", href: "https://www.codecademy.com/" }
];

let currentImageValue = "";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("intro-form");
  const formPanel = document.getElementById("form-panel");
  const outputPanel = document.getElementById("output-panel");
  const pageHeading = document.getElementById("page-heading");
  const pictureInput = document.getElementById("picture");
  const imagePreview = document.getElementById("image-preview");
  const defaultPicturePath = document.getElementById("default-picture-path").value;
  const addCourseButton = document.getElementById("add-course");
  const clearButton = document.getElementById("clear-form");
  const resetButton = document.getElementById("reset-form");
  const coursesContainer = document.getElementById("courses-container");
  const linksContainer = document.getElementById("links-container");

  currentImageValue = defaultPicturePath;
  imagePreview.src = defaultPicturePath;

  renderDefaultCourses();
  renderDefaultLinks();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateForm()) {
      form.reportValidity();
      return;
    }

    const data = collectFormData();
    renderIntroductionOutput(data);
  });

  addCourseButton.addEventListener("click", () => {
    addCourseBlock();
  });

  pictureInput.addEventListener("change", handleImageUpload);

  clearButton.addEventListener("click", clearFormValues);

  resetButton.addEventListener("click", () => {
    setTimeout(() => {
      resetFormToDefaults();
    }, 0);
  });

  function renderDefaultCourses() {
    coursesContainer.innerHTML = "";
    DEFAULT_COURSES.forEach((course) => addCourseBlock(course));
  }

  function renderDefaultLinks() {
    linksContainer.innerHTML = "";
    DEFAULT_LINKS.forEach((link, index) => addLinkBlock(link, index + 1));
  }

  function addCourseBlock(course = {}) {
    const courseBlock = document.createElement("div");
    courseBlock.className = "course-block";

    courseBlock.innerHTML = `
      <hr>
      <label>Department *</label>
      <input
        type="text"
        class="course-department"
        value="${escapeAttribute(course.department || "")}"
        placeholder="Example: ITIS"
        required
      />

      <label>Number *</label>
      <input
        type="text"
        class="course-number"
        value="${escapeAttribute(course.number || "")}"
        placeholder="Example: 3135"
        required
      />

      <label>Course Name *</label>
      <input
        type="text"
        class="course-name"
        value="${escapeAttribute(course.name || "")}"
        placeholder="Enter course name"
        required
      />

      <label>Reason *</label>
      <textarea
        class="course-reason"
        placeholder="Why are you taking this course?"
        required
      >${escapeText(course.reason || "")}</textarea>

      <button type="button" class="delete-course">Delete Course</button>
    `;

    courseBlock.querySelector(".delete-course").addEventListener("click", () => {
      courseBlock.remove();
    });

    coursesContainer.appendChild(courseBlock);
  }

  function addLinkBlock(link = {}, linkNumber = 1) {
    const linkBlock = document.createElement("div");
    linkBlock.className = "link-block";

    linkBlock.innerHTML = `
      <hr>
      <label>Link ${linkNumber} Name *</label>
      <input
        type="text"
        class="link-name"
        value="${escapeAttribute(link.name || "")}"
        placeholder="Example: GitHub"
        required
      />

      <label>Link ${linkNumber} URL *</label>
      <input
        type="url"
        class="link-href"
        value="${escapeAttribute(link.href || "")}"
        placeholder="https://example.com"
        required
      />
    `;

    linksContainer.appendChild(linkBlock);
  }

  function handleImageUpload() {
    const selectedFile = pictureInput.files[0];

    if (!selectedFile) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      currentImageValue = event.target.result;
      imagePreview.src = currentImageValue;
    };
    reader.readAsDataURL(selectedFile);
  }

  function clearFormValues() {
    const inputs = Array.from(
      form.querySelectorAll("input:not([type='hidden']), textarea")
    );

    inputs.forEach((input) => {
      if (input.type === "file") {
        input.value = "";
      } else {
        input.value = "";
      }
    });

    coursesContainer.innerHTML = "";
    linksContainer.innerHTML = "";

    for (let i = 1; i <= 5; i += 1) {
      addLinkBlock({}, i);
    }

    currentImageValue = "";
    imagePreview.removeAttribute("src");
  }

  function resetFormToDefaults() {
    form.reset();
    renderDefaultCourses();
    renderDefaultLinks();
    currentImageValue = defaultPicturePath;
    imagePreview.src = defaultPicturePath;
  }

  function validateForm() {
    const courseBlocks = Array.from(document.querySelectorAll(".course-block"));
    const linkBlocks = Array.from(document.querySelectorAll(".link-block"));

    if (courseBlocks.length === 0) {
      alert("Please add at least one course.");
      return false;
    }

    if (linkBlocks.length < 5) {
      alert("Please include all 5 links.");
      return false;
    }

    return form.checkValidity();
  }

  function collectFormData() {
    const courses = Array.from(document.querySelectorAll(".course-block")).map((block) => ({
      department: block.querySelector(".course-department").value.trim(),
      number: block.querySelector(".course-number").value.trim(),
      name: block.querySelector(".course-name").value.trim(),
      reason: block.querySelector(".course-reason").value.trim()
    }));

    const links = Array.from(document.querySelectorAll(".link-block")).map((block) => ({
      name: block.querySelector(".link-name").value.trim(),
      href: normalizeUrl(block.querySelector(".link-href").value.trim())
    }));

    return {
      firstName: document.getElementById("first-name").value.trim(),
      middleName: document.getElementById("middle-name").value.trim(),
      preferredName: document.getElementById("preferred-name").value.trim(),
      lastName: document.getElementById("last-name").value.trim(),
      divider: document.getElementById("divider").value.trim(),
      mascotAdjective: document.getElementById("mascot-adjective").value.trim(),
      mascotAnimal: document.getElementById("mascot-animal").value.trim(),
      image: currentImageValue || "",
      pictureCaption: document.getElementById("picture-caption").value.trim(),
      personalStatement: document.getElementById("personal-statement").value.trim(),
      personalBackground: document.getElementById("personal-background").value.trim(),
      professionalBackground: document.getElementById("professional-background").value.trim(),
      academicBackground: document.getElementById("academic-background").value.trim(),
      subjectBackground: document.getElementById("subject-background").value.trim(),
      primaryComputer: document.getElementById("primary-computer").value.trim(),
      funnyThing: document.getElementById("funny-thing").value.trim(),
      shareMore: document.getElementById("share-more").value.trim(),
      quote: document.getElementById("quote").value.trim(),
      quoteAuthor: document.getElementById("quote-author").value.trim(),
      acknowledgmentStatement: document.getElementById("acknowledgment-statement").value.trim(),
      acknowledgmentDate: document.getElementById("acknowledgment-date").value,
      courses,
      links
    };
  }

  function buildDisplayName(data) {
    const parts = [escapeHtml(data.firstName)];

    if (data.middleName) {
      parts.push(escapeHtml(data.middleName));
    }

    if (data.preferredName) {
      parts.push(`"${escapeHtml(data.preferredName)}"`);
    }

    parts.push(escapeHtml(data.lastName));

    const mascotPart = [
      escapeHtml(data.mascotAdjective),
      escapeHtml(data.mascotAnimal)
    ].join(" ");

    return `${parts.join(" ")} ${escapeHtml(data.divider)} ${mascotPart}`;
  }

  function buildIntroductionMarkup(data) {
    const courseMarkup = data.courses.map((course) => `
      <li>
        <strong>${escapeHtml(course.department)} ${escapeHtml(course.number)} - ${escapeHtml(course.name)}:</strong>
        ${escapeHtml(course.reason)}
      </li>
    `).join("");

    const linkMarkup = data.links
      .filter((link) => link.name && link.href)
      .map((link) => `
        <a href="${escapeAttribute(link.href)}" target="_blank" rel="noopener noreferrer">
          ${escapeHtml(link.name)}
        </a>
      `)
      .join(` ${escapeHtml(data.divider)} `);

    const funnyItem = data.funnyThing
      ? `<li><strong>Funny Thing:</strong> ${escapeHtml(data.funnyThing)}</li>`
      : "";

    const shareItem = data.shareMore
      ? `<li><strong>Something I'd Like to Share:</strong> ${escapeHtml(data.shareMore)}</li>`
      : "";

    return `
      <section class="introduction-output">
        <h3>${buildDisplayName(data)}</h3>

        <figure>
          <img
            src="${escapeAttribute(data.image)}"
            alt="Introduction image for ${escapeAttribute(data.firstName)} ${escapeAttribute(data.lastName)}"
            style="max-width: 300px; height: auto;"
          />
          <figcaption>${escapeHtml(data.pictureCaption)}</figcaption>
        </figure>

        <p>${escapeHtml(data.personalStatement)}</p>

        <ul>
          <li><strong>Personal Background:</strong> ${escapeHtml(data.personalBackground)}</li>
          <li><strong>Professional Background:</strong> ${escapeHtml(data.professionalBackground)}</li>
          <li><strong>Academic Background:</strong> ${escapeHtml(data.academicBackground)}</li>
          <li><strong>Background in this Subject:</strong> ${escapeHtml(data.subjectBackground)}</li>
          <li><strong>Primary Computer Platform:</strong> ${escapeHtml(data.primaryComputer)}</li>
          ${funnyItem}
          ${shareItem}
          <li>
            <strong>Courses I'm Taking and Why:</strong>
            <ul>
              ${courseMarkup}
            </ul>
          </li>
          <li><strong>Favorite Quote:</strong> "${escapeHtml(data.quote)}" - ${escapeHtml(data.quoteAuthor)}</li>
          <li><strong>Links:</strong> ${linkMarkup}</li>
          <li><strong>Acknowledgment:</strong> ${escapeHtml(data.acknowledgmentStatement)} (${escapeHtml(data.acknowledgmentDate)})</li>
        </ul>
      </section>
    `;
  }

  function renderIntroductionOutput(data) {
    pageHeading.textContent = "Introduction Form";
    formPanel.hidden = true;
    outputPanel.hidden = false;

    outputPanel.innerHTML = `
      ${buildIntroductionMarkup(data)}
      <p><a href="#" id="start-over-link">Reset and create another introduction</a></p>
    `;

    attachStartOverHandler();
  }

  function renderCodeOutput(title, languageClass, codeString) {
    pageHeading.textContent = title;
    formPanel.hidden = true;
    outputPanel.hidden = false;

    outputPanel.innerHTML = `
      <section class="code-output">
        <pre><code class="${languageClass}">${escapeHtml(codeString)}</code></pre>
        <p><a href="#" id="start-over-link">Reset and create another introduction</a></p>
      </section>
    `;

    attachStartOverHandler();

    if (window.hljs) {
      const codeElement = outputPanel.querySelector("code");
      window.hljs.highlightElement(codeElement);
    }
  }

  function attachStartOverHandler() {
    const startOverLink = document.getElementById("start-over-link");

    startOverLink.addEventListener("click", (event) => {
      event.preventDefault();
      outputPanel.hidden = true;
      formPanel.hidden = false;
      outputPanel.innerHTML = "";
      pageHeading.textContent = "Introduction Form";
      resetFormToDefaults();
    });
  }

  function buildJsonObject(data) {
    return {
      first_name: data.firstName,
      middle_name: data.middleName,
      preferred_name: data.preferredName,
      last_name: data.lastName,
      divider: data.divider,
      mascot_adjective: data.mascotAdjective,
      mascot_animal: data.mascotAnimal,
      image: data.image,
      image_caption: data.pictureCaption,
      personal_statement: data.personalStatement,
      personal_background: data.personalBackground,
      professional_background: data.professionalBackground,
      academic_background: data.academicBackground,
      subject_background: data.subjectBackground,
      primary_computer: data.primaryComputer,
      funny_thing: data.funnyThing,
      share_more: data.shareMore,
      quote: data.quote,
      quote_author: data.quoteAuthor,
      acknowledgment_statement: data.acknowledgmentStatement,
      acknowledgment_date: data.acknowledgmentDate,
      courses: data.courses,
      links: data.links
    };
  }

  function buildLiteralHtmlString(data) {
    return `
<h2>Introduction HTML</h2>
<h3>${buildRawDisplayName(data)}</h3>
<figure>
  <img src="${data.image}" alt="Introduction image for ${data.firstName} ${data.lastName}" />
  <figcaption>${data.pictureCaption}</figcaption>
</figure>
<p>${data.personalStatement}</p>
<ul>
  <li><strong>Personal Background:</strong> ${data.personalBackground}</li>
  <li><strong>Professional Background:</strong> ${data.professionalBackground}</li>
  <li><strong>Academic Background:</strong> ${data.academicBackground}</li>
  <li><strong>Background in this Subject:</strong> ${data.subjectBackground}</li>
  <li><strong>Primary Computer Platform:</strong> ${data.primaryComputer}</li>
  ${data.funnyThing ? `<li><strong>Funny Thing:</strong> ${data.funnyThing}</li>` : ""}
  ${data.shareMore ? `<li><strong>Something I'd Like to Share:</strong> ${data.shareMore}</li>` : ""}
  <li>
    <strong>Courses I'm Taking and Why:</strong>
    <ul>
      ${data.courses.map((course) => `
      <li><strong>${course.department} ${course.number} - ${course.name}:</strong> ${course.reason}</li>
      `).join("")}
    </ul>
  </li>
  <li><strong>Favorite Quote:</strong> "${data.quote}" - ${data.quoteAuthor}</li>
  <li>
    <strong>Links:</strong>
    ${data.links.map((link) => `<a href="${link.href}">${link.name}</a>`).join(` ${data.divider} `)}
  </li>
  <li><strong>Acknowledgment:</strong> ${data.acknowledgmentStatement} (${data.acknowledgmentDate})</li>
</ul>`.trim();
  }

  function buildRawDisplayName(data) {
    const parts = [data.firstName];

    if (data.middleName) {
      parts.push(data.middleName);
    }

    if (data.preferredName) {
      parts.push(`"${data.preferredName}"`);
    }

    parts.push(data.lastName);

    return `${parts.join(" ")} ${data.divider} ${data.mascotAdjective} ${data.mascotAnimal}`;
  }

  function normalizeUrl(url) {
    if (!url) {
      return "";
    }

    if (
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("mailto:") ||
      url.startsWith("tel:")
    ) {
      return url;
    }

    return `https://${url}`;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value);
  }

  function escapeText(value) {
    return escapeHtml(value);
  }

  window.IntroFormApp = {
    validateForm,
    collectFormData,
    renderCodeOutput,
    buildJsonObject,
    buildLiteralHtmlString
  };
});