/**
 * Arquivo JS responsavel por manipular os eventos na pagina
 * sobre.html
 */

// modulo ipcRenderer para comunicao com o processo prinicipal
// modulo shell para executar funcoes nativa do sistema operacional
// modulo process para recuperar informacoes da aplicao e modulos
const { ipcRenderer, shell } = require('electron');
const process = require('process');

// referencia aos elementos HTML
const linkFechar = document.querySelector('#link-fechar');
const linkAutor = document.querySelector('#link-autor');
const versaoElectron = document.querySelector('#versao-electron');

/**
 * Evento iniciado quando a pagina foi carregada completamente.
 * Define no elemento "versaoElectron" a versao do modulo electon.
 */
window.onload = () => {
  versaoElectron.textContent = process.versions.electron;
};

/**
 * Cria um listener para escutar o evento de clique no
 * link "fechar".
 * Quando clicado envia para o processo principal o evento
 * para fechar a janela "sobre".
 */
linkFechar.addEventListener('click', function () {
  ipcRenderer.send('fechar-janela-sobre');
});

/**
 * Cria um listener para escutar o evento de clique no
 * link "autor".
 * Quando clicado utiliza o modulo shell para abrir uma
 * janela do browser padrao do sistema operacional com
 * o link do github deste autor.
 */
linkAutor.addEventListener('click', function () {
  shell.openExternal('https://www.github.com/barcanjo');
});
