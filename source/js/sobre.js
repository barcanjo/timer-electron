const { ipcRenderer, shell } = require('electron');
const process = require('process');
const versaoElectron = document.querySelector('#versao-electron');
const versaoNode = document.querySelector('#versao-node');

window.onload = () => {
  versaoElectron.textContent = process.versions.electron;
  versaoNode.textContent = process.version;
};

const linkFechar = document.querySelector('#link-fechar');
const linkAutor = document.querySelector('#link-autor');

linkFechar.addEventListener('click', () => {
  ipcRenderer.send('fechar-janela-sobre');
});

linkAutor.addEventListener('click', () => {
  shell.openExternal('https://github.com/barcanjo');
});
