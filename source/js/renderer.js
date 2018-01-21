const { ipcRenderer } = require('electron');
const timer = require('./timer');

const botaoPlay = document.querySelector('.botao-play');
const linkSobre = document.querySelector('#link-sobre');
const tempo = document.querySelector('.tempo');

let imgs = ['./img/play-button.svg', './img/stop-button.svg'];
let play = false;

linkSobre.addEventListener('click', () => {
  ipcRenderer.send('abrir-janela-sobre');
});

botaoPlay.addEventListener('click', () => {
  if (play) {
    timer.parar();
    play = false;
  } else {
    timer.iniciar(tempo);
    play = true;
  }

  imgs = imgs.reverse();
  botaoPlay.src = imgs[0];
});
