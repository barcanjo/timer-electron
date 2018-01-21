const { ipcRenderer } = require('electron');
const moment = require('moment');

let segundos;
let tempo;
let timer;

module.exports = {
  iniciar(el) {
    tempo = moment.duration(el.textContent);
    segundos = tempo.asSeconds();

    clearInterval(timer);

    timer = setInterval(() => {
      segundos++;

      el.textContent = this.segundosParaTempo(segundos);
    }, 1000);
  },

  parar(curso) {
    const tempoEstudado = this.segundosParaTempo(segundos);
    clearInterval(timer);
    ipcRenderer.send('curso-parado', curso, tempoEstudado);
  },

  segundosParaTempo(segundos) {
    return moment().startOf('day').seconds(segundos).format('HH:mm:ss');
  },
};
