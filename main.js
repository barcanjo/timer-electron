const { app, BrowserWindow } = require('electron');

app.on('ready', () => {
  console.log('Aplicacao iniciada!');
  let mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
  });

  mainWindow.loadURL(`file://${__dirname}/source/index.html`);
});

app.on('window-all-closed', () => {
  app.quit();
});
