const { ipcRenderer } = require('electron');
const data = require('../../data');
const timer = require('./timer');

const botaoPlay = document.querySelector('.botao-play');
const curso = document.querySelector('.curso');
const linkSobre = document.querySelector('#link-sobre');
const tempo = document.querySelector('.tempo');

let imgs = ['./img/play-button.svg', './img/stop-button.svg'];
let play = false;

window.onload = () => {
  data.carregarDadosCurso(curso.textContent)
  .then((dados) => {
    tempo.textContent = dados.tempo;
  });
};

linkSobre.addEventListener('click', () => {
  ipcRenderer.send('abrir-janela-sobre');
});

botaoPlay.addEventListener('click', () => {
  if (play) {
    timer.parar(curso.textContent);
    play = false;
  } else {
    timer.iniciar(tempo);
    play = true;
  }

  imgs = imgs.reverse();
  botaoPlay.src = imgs[0];
});
