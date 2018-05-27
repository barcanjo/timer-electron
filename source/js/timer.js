// modulo ipcRenderer para comunicao com o processo prinicipal
const { ipcRenderer } = require('electron');
// biblioteca moment para tratamento de data/hora
const moment = require('moment');

let segundos = 0;
let tempo;
let timer;

/**
 * Exporta as funcoes que serao utilizadas na aplicacao
 * por outras funcoes.
**/
module.exports = {
  /**
   * Funcao que inicia o tempo do curso estudado.
   * Recupera o valor do parametro "el" que simboliza o
   * total do tempo estudado do curso ate o momento e
   * extrai dele o valor em segundos.
   * A cada 1 segundo adiciona 1 segundo no tempo estudado
   * do curso e redefine o valor do elemento referenciado
   * no parametro "el", atualizando o tempo do curso em
   * tempo real. 
   * @param {*} el O elemento que representa o tempo estudado
   * no curso.
   */
  iniciar(el) {
    tempo = moment.duration(el.textContent);
    segundos = tempo.asSeconds();

    clearInterval(timer);

    timer = setInterval(() => {
      segundos++;

      el.textContent = this.segundosParaTempo(segundos);
    }, 1000);
  },

  /**
   * Funcao que para o tempo estudado.
   * Converte o tempo estudado, presente na variavel segundos,
   * de segundos para horario. Limpa o tempo da variavel timer
   * e envia para o modulo principal o evento para parar o curso
   * informando o nome do curso e o tempo estudado.
   * @param {*} curso O nome do curso estudado a ser parado.
   */
  parar(curso) {
    const tempoEstudado = this.segundosParaTempo(segundos);
    clearInterval(timer);
    ipcRenderer.send('curso-parado', curso, tempoEstudado);
  },

  /**
   * Converte um tempo em segundos para tempo valido no formato
   * HH:mm:ss.
   * @param {*} segundos O tempo em segundos.
   */
  segundosParaTempo(segundos) {
    return moment().startOf('day').seconds(segundos).format('HH:mm:ss');
  },
};
