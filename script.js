const keys = document.querySelectorAll('.key');
const fullScreenButton = document.querySelector('.fullscreen-button');

function resized() {
    var vw = document.documentElement.clientWidth;
    var vh = document.documentElement.clientHeight;
    var keysize = 0.0;

    if(vw >= vh) {
        keysize = vh * 0.9 / 3;
    }
    else {
        keysize = vw * 0.9 / 5;
    }

    document.documentElement.style.setProperty("--key-size", "" + Math.round(keysize) + "px");
}

window.addEventListener('load', () => resized());
window.addEventListener('resize', () => resized());

fullScreenButton.addEventListener('click', () => {
    if(document.fullscreenElement) {
        document.exitFullscreen();
        fullScreenButton.classList.remove('active')
    }
    else {
        document.documentElement.requestFullscreen();
        fullScreenButton.classList.add('active')
    }
})


if(typeof window.ontouchstart === "undefined") {
    keys.forEach(key => {
        key.addEventListener('mousedown', () => playNote(key))
        key.addEventListener('mouseup', () => key.classList.remove('active'))
    })
}
else {
    keys.forEach(key => {
        key.addEventListener('touchstart', () => playNote(key))
        key.addEventListener('touchend', () => key.classList.remove('active'))
    })
}

function playNote(key) {
    const noteAudio = document.getElementById(key.dataset.note);
    var clone = noteAudio.cloneNode(true);
    clone.volume = 0.07;
    clone.play();
    key.classList.add('active');
}