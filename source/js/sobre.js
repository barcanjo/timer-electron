const { ipcRenderer, shell } = require('electron');
const process = require('process');

const linkFechar = document.querySelector('#link-fechar');
const linkAutor = document.querySelector('#link-autor');
const versaoElectron = document.querySelector('#versao-electron');

window.onload = () => {
  versaoElectron.textContent = process.versions.electron;
};

linkFechar.addEventListener('click', function () {
  ipcRenderer.send('fechar-janela-sobre');
});

linkAutor.addEventListener('click', function () {
  shell.openExternal('https://www.github.com/barcanjo');
});
