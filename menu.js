const logo = document.querySelector('.titulo');
const menu = document.querySelector('.nav-img');
const cuerpo = document.body;
const cajero = document.getElementById('cajero');
const videoCajero = document.getElementById('video-cajero');
menu.addEventListener('click', (e) => {
    if (logo) {
        logo.classList.toggle('ocultar');
    }
    if (cajero) {
        cajero.classList.toggle('ocultar');
        videoCajero.classList.toggle('ocultar');
    }
    menu.classList.toggle('rotar');
    cuerpo.classList.toggle('oscuro');
})

const audioElement = document.getElementById('musica');
if (audioElement) {
    audioElement.volume = 0.1; // Establece el volumen
}

