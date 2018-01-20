const { ipcRenderer } = require('electron');

const titulo = document.querySelector('#titulo');
const linkSobre = document.querySelector('#link-sobre');

titulo.innerHTML = 'Hello Electron';
linkSobre.addEventListener('click', () => {
  ipcRenderer.send('abrir-janela-sobre');
});

console.log('JavaScript carregado na aplicacao');
