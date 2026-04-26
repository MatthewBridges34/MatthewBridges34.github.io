const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

function convertMarkdownToHtml(markdown) {
    let html = markdown;

    html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
    html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
    html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

    html = html.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/gim, "<em>$1</em>");

    html = html.replace(/^- (.*$)/gim, "<li>$1</li>");
    html = html.replace(/(<li>.*<\/li>)/gims, "<ul>$1</ul>");

    html = html.replace(/\n/g, "<br>");

    return html;
}

function updateConverter() {
    const markdown = markdownInput.value;
    const html = convertMarkdownToHtml(markdown);

    htmlOutput.textContent = html;
    preview.innerHTML = html;
}

markdownInput.addEventListener("input", updateConverter);

updateConverter();