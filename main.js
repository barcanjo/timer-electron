/**
 * Arquivo JS representando o processo prinicipal da aplicao
 * ipcMain.
 */

 // modulo app do electron responsavel por manipular a aplicao
 // modulo BrowserWindow do electron responsavel por manipular o navegador
 // modulo ipcMain do electron responsavel por manipular o processo principal
 // modulo Tray do electron responsavel manipular o Tray da aplicacao
 // modulo Menu do electron responsavel por gerar os menus do Tray
 // modulo globalShortcut do electron para registrar atalhos globais da aplicacao
const { app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut } = require('electron');

// modulos da aplicacao
const data = require('./data');
const templateGenerator = require('./source/js/template');

let tray = null;
let mainWindow = null;

/**
 * Evento acionado quando a aplicacao foi iniciada.
 * Cria um tray para a aplicacao informando seu icone.
 * Cria a janela prinicipal da aplicacao com tamanho pre-definido
 * e nela carrega o conteudo da pagina index.html.
 * Cria os menus principais da aplicacao.
 * Registra um atalho global da aplicacao para iniciar ou parar
 * o curso estudado.
 */
app.on('ready', () => {
  console.log('Aplicacao iniciada!');

  mainWindow = new BrowserWindow({
    height: 400,
    width: 600,
  });

  let templateMenu = templateGenerator.geraMenuPrincipalTemplate(app);
  let menuPrincipal = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(menuPrincipal);

  tray = new Tray( __dirname + '/source/img/icon-tray.png');
  let template = templateGenerator.geraTrayTemplate(mainWindow);
  let trayMenu = Menu.buildFromTemplate(template)
  tray.setContextMenu(trayMenu);

  globalShortcut.register('CmdOrCtrl+Shift+S', () => {
    mainWindow.send('atalho-iniciar-parar');
  });

  mainWindow.loadURL(`file://${__dirname}/source/index.html`);
});

/**
 * Manipula o evento "window-all-closed", responsavel por
 * encerrar a aplicacao.
 * Com a instancia da janela "app" valida, chama a funcao
 * "quit" para encerrar a aplicacao.
 */
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

/**
 * Manipua o evento "fechar-janela-sobre", responsavel por
 * notifica que a janela sobre deve ser fechada.
 * Com a instancia da janela sobre valida, chama a funcao
 * "close" para fechar a janela.
 */
ipcMain.on('fechar-janela-sobre', () => {
  sobreWindow.close();
});

/**
 * Manipula o evento "curso-parado", responsavel por
 * notificar que o curso estudado foi parado.
 * Chamada a funcao "salvarDados" para salvar os dados
 * do curso parado, informando o nome do curso e o tempo
 * estudado.
 */
ipcMain.on('curso-parado', (event, curso, tempoEstudado) => {
  data.salvarDados(curso, tempoEstudado);
});

/**
 * Manipula o evento 'curso-adicionado', responsavel por
 * notificar que um curso foi adicionado.
 * Cria um template para o Tray a partir do curso adicionado,
 * utilizando a funcao adicionaCursoNoTray que retorna todos
 * os menus com o novo curso.
 */
ipcMain.on('curso-adicionado', (event, novoCurso) => {
    let novoTemplate = templateGenerator.adicionaCursoNoTray(novoCurso, mainWindow);
    let novoTrayTemplate = Menu.buildFromTemplate(novoTemplate);
    tray.setContextMenu(novoTrayTemplate);
});