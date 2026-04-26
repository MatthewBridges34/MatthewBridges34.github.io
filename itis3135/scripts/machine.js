function playPad(letter) {
    const audio = document.getElementById(letter);
    const pad = audio.parentElement;
    const display = document.getElementById("display");

    audio.currentTime = 0;
    audio.play();

    display.textContent = pad.id.replaceAll("-", " ");
}

function triggerPad(button) {
    const audio = button.querySelector("audio");
    playPad(audio.id);
}

const drumPads = document.querySelectorAll(".drum-pad");

drumPads.forEach(function(pad) {
    pad.addEventListener("click", function() {
        triggerPad(pad);
    });
});

document.addEventListener("keydown", function(event) {
    const key = event.key.toUpperCase();
    const validKeys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];

    if (validKeys.includes(key)) {
        playPad(key);
    }
});