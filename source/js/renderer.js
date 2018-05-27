/**
 * Arquivo JS responsavel por manipular os eventos na pagina
 * principal da aplicacao index.html
 */

// modulo ipcRenderer para comunicao com o processo prinicipal
const { ipcRenderer } = require('electron');

// modulos da aplicacao
const data = require('../../data');
const timer = require('./timer');

// referencia aos elementos HTML
const botaoPlay = document.querySelector('.botao-play');
const curso = document.querySelector('.curso');
const linkSobre = document.querySelector('#link-sobre');
const tempo = document.querySelector('.tempo');
let botaoAdicionar = document.querySelector('.botao-adicionar');
let campoAdicionar = document.querySelector('.campo-adicionar');

let imgs = ['./img/play-button.svg', './img/stop-button.svg'];
let play = false;

/**
 * Evento iniciado quando a pagina principal for carregada
 * completamente.
 * Recupera o nome do curso (presente no elemento HTML)
 * e carrega os seus dados, definindo no elemento HTML
 * o tempo estudado.
 */
window.onload = () => {
  data.carregarDadosCurso(curso.textContent)
  .then((dados) => {
    tempo.textContent = dados.tempo;
  });
};

/**
 * Cria um listener para escutar o evento de clique no
 * link "sobre".
 * Quando clicado envia para o processo prinicipal o evento
 * para abrir a janela "sobre".
 */
linkSobre.addEventListener('click', () => {
  ipcRenderer.send('abrir-janela-sobre');
});

/**
 * Cria um listener para escutar o evento de clique no
 * botao botao "play".
 * Quando clicado verifica se a variavel "play" esta
 * definida como true para entao chamar a funcao de parar
 * o tempo do curso estudado, informando o nome do curso
 * a partir do elemento "curso", e definir a variavel "play"
 * como false. Caso a varivel "play" seja false o tempo
 * do curso estudado sera iniciado e a variavel "play"
 * recebe o valor true.
 * A ordem das imagens do botao inverte para que o botao
 * tenha a imagem trocada, simbolizando a operacao em
 * andamento (play ou stop).
 */
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

/**
 * Cria um listener para escutar o evento de clique no botao
 * de adicionar um curso.
 * Quando clicado altera o nome do curso selecionada para o
 * valor do campo "campoAdicionar" e define o tempo para
 * '00:00:00', e apaga o conteudo do campo "campoAdicionar";
 * Envia um evento para o ipcRenderer notificando que o curso
 * foi adicionado.
 */
botaoAdicionar.addEventListener('click', function() {
  if (campoAdicionar.value == '') {
    console.error('Informe o nome de um curso valido');
    return;
  }

  let novoCurso = campoAdicionar.value;
  curso.textContent = novoCurso;
  tempo.textContent = '00:00:00';
  campoAdicionar.textContent = '';
  ipcRenderer.send('curso-adicionado', novoCurso);
});

/**
 * Cria um listener para escutar o evento de clique nos
 * itens do menu do Tray.
 * Quando clicado para o curso em andamento, altera o nome
 * do curso e o tempo estudado para os dados obtidos a partir
 * do arquivo do curso.
 */
ipcRenderer.on('curso-trocado', (event, nomeCurso) => {
  timer.parar(curso.textContent);

  data.carregarDadosCurso(nomeCurso)
    .then((dados) => {
      tempo.textContent = dados.tempo;
    })
    .catch((err) => {
      console.error('Nao foi possivel encontrar o arquivo do curso');
      tempo.textContent = "00:00:00";
    });
    curso.textContent = nomeCurso;
});

/**
 * Cria um listener para escutar o evento de atalho global
 * para iniciar ou parar o curso estudado.
 * Cria um evento de clique do mouse e o despacha para o
 * botao de play, simulando um clique.
 */
ipcRenderer.on('atalho-iniciar-parar', () => {
  let click = new MouseEvent('click');
  botaoPlay.dispatchEvent(click);
});