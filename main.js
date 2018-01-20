const { app, BrowserWindow, ipcMain } = require('electron');

app.on('ready', () => {
  console.log('Aplicacao iniciada!');
  let mainWindow = new BrowserWindow({
    height: 400,
    width: 600,
  });

  mainWindow.loadURL(`file://${__dirname}/source/index.html`);
});

app.on('window-all-closed', () => {
  app.quit();
});

let sobreWindow = null;

ipcMain.on('abrir-janela-sobre', () => {
  if (sobreWindow == null) {
    sobreWindow = new BrowserWindow({
      height: 250,
      width: 300,
      alwaysOnTop: true,
      frame: false,
    });

    sobreWindow.on('closed', () => {
      sobreWindow = null;
    });
  }

  sobreWindow.loadURL(`file://${__dirname}/source/sobre.html`);
});

ipcMain.on('fechar-janela-sobre', () => {
  sobreWindow.close();
});
