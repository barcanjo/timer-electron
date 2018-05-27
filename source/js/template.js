/**
 * Arquivo JS responsavel por gerar os templates para o
 * tray da aplicacao.
 */

 // modulo ipcMain do electron responsavel por manipular o processo principal
const { ipcMain } = require('electron');

// modulos da aplicacao
const data = require('../../data');

 /**
 * Exporta as funcoes que serao utilizadas na aplicacao
 * por outras funcoes.
**/
 module.exports = {
    templateInicial: null,
     /**
      * Funcao utilizada para gerar os templates do tray
      * da aplicacao.
      * Para cada nome de curso retornado da funcao pegaNomeDosCursos
      * cria um novo template com um evento de click notificando o
      * processo prinicipal que o curso foi trocado.
      * @param {*} win A janela principal que recebera o evento de
      * click de cada menu item do Tray.
      */
     geraTrayTemplate(win) {
        let template = [
            {
                label:  'Cursos',
            },
            {
                type: 'separator',
            },
        ];

        let cursos = data.pegaNomeDosCursos();
        cursos.forEach((curso) => {
            let menuItem = {
                click: () => {
                    win.send('curso-trocado', curso);
                },
                label: curso,
                type: 'radio',
            };

            template.push(menuItem);
        });

        this.templateInicial = template;

        return template;
     },

     /**
      * Funcao utilizada para adicionar um curso ao Tray.
      * Utiliza o valor do parametro curso para adicionar a
      * propriedade templateInicial, que possui todos os itens
      * do menu atual, um novo item referente ao curso.
      * Retorna a propriedade templateInicial com todos os
      * itens do menu mais o novo item do curso.
      * @param {*} curso O nome do curso.
      * @param {*} win A janela principal da aplicacao.
      */
     adicionaCursoNoTray(curso, win) {
         this.templateInicial.push({
             checked: true,
             click: () => {
                 win.send('curso-trocado', curso);
             },
             label: curso,
             type: 'radio',
         });

         return this.templateInicial;
     },

     /**
      * Funcao utilizada para gerar os templates do menu da aplicacao.
      * Utiliza o modulo ipcMain para emitir um evento no processo
      * principal ja que a utilizacao desse arquivo JS tambem se
      * encontra no processo principal.
      * @param {*} app As informacoes da aplicacao.
      */
     geraMenuPrincipalTemplate(app) {
         let templateMenu = [
             {
                 label: 'View',
                 submenu: [
                     {
                         role: 'reload',
                     },
                     {
                         role: 'toggledevtools',
                     }
                 ],
             },
             {
                 label: 'Window',
                 submenu: [
                     {
                         accelerator: 'CmdOrCtrl+M',
                         role: 'minimize',
                     },
                     {
                         role: 'close',
                     }
                 ],
             },
             {
                 label: 'Sobre',
                 submenu: [
                     {
                         accelerator: 'CmdOrCtrl+I',
                         click: () => {
                             ipcMain.emit('abrir-janela-sobre');
                         },
                         label: 'Sobre o Alura Timer',
                     }
                 ],
             }
         ];

         if (process.platform == 'darwin') {
             templateMenu.unshift(
                 {
                     label: app.getName(),
                     submenu: [
                         {
                             label: 'Rodando no Mac OS!',
                         }
                     ],
                 }
             );
         }

         return templateMenu;
     }
 }