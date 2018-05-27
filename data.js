/**
 * Arquivo JS responsavel por manipular os dados
 * dos cursos.
 */

// biblioteca jsonfile-promised para leitura e gravacao de arquivos
const jsonfile = require('jsonfile-promised');
// biblioteca js para leitura e gravacao de arquivos
const fs = require('fs');

/**
 * Exporta as funcoes que serao utilizadas na aplicacao
 * por outras funcoes.
**/
module.exports = {

  /**
   * Adiciona o arquivo o tempo estudado de um curso.
   * Utiliza o parametro "arquivo" para  encontrar o arquivo do curso
   * e o parametro "tempoEstudado" para atualizar o tempo estudado.
   * 
   * @param {*} arquivo O nome completo do arquivo que sera atualizado.
   * @param {*} tempoEstudado O tempo estudado do curso.
   */
  adicionarTempoAoCurso(arquivo, tempoEstudado) {
    const dados = {
      ultimoEstudo: new Date().toString(),
      tempo: tempoEstudado,
    };

    jsonfile.writeFile(arquivo, dados, { spaces: 2 })
    .then(() => {
      console.log('Tempo salvo com sucesso!');
    })
    .catch((err) => {
      console.error(err);
    });
  },

  /**
   * Carrega os dados do curso estudado utilizando o parametro
   * "curso".
   * Le os dados do arquivo JSON apos encontrar o arquivo do curso.
   * 
   * @param {*} curso O nome do curso.
   */
  carregarDadosCurso(curso) {
    const arquivoCurso = __dirname + '/data/' + curso + '.json';
    return jsonfile.readFile(arquivoCurso);
  },

  /**
   * Cria um arquivo JSON com os dados do curso utilizando
   * o parametro nome.
   * 
   * @param {*} nome O nome completo do arquivo.
   * @param {*} conteudo O conteudo que sera gravado no curso.
   */
  criarArquivoDeCurso(nome, conteudo) {
    return jsonfile.writeFile(nome, conteudo, { spaces: 2 })
    .then(() => {
      console.log(`Arquivo ${nome} criado!`);
    })
    .catch((err) => {
      console.error(err);
    });
  },

  /**
   * Salva os dados do curso estudado, criando um novo arquivo
   * ou atualizando o arquivo do curso.
   * Atraves da variavel node "__dirname" verifica se existe
   * um arquivo JSON com o nome do curso, e caso exista
   * o tempo estudado sera adicionado, senao o arquivo sera
   * criado e entao o tempo adicionado.
   * 
   * @param {*} curso O nome do curso.
   * @param {*} tempoEstudado O tempo estudado do curso.
   */
  salvarDados(curso, tempoEstudado) {
    const arquivoCurso = __dirname + '/data/' + curso + '.json';
    if (fs.existsSync(arquivoCurso)) {
      this.adicionarTempoAoCurso(arquivoCurso, tempoEstudado);
    } else {
      this.criarArquivoDeCurso(arquivoCurso, {})
      .then(() => {
        this.adicionarTempoAoCurso(arquivoCurso, tempoEstudado);
      });
    }
  },

  /**
   * Retorna os nomes dos cursos estudados atraves dos arquivos
   * JSON presentes na pasta data da aplicacao.
   */
  pegaNomeDosCursos() {
      let arquivos = fs.readdirSync(__dirname + '/data/');
      let cursos = arquivos.map((arquivo) => {
          return arquivo.substr(0, arquivo.lastIndexOf('.'));
      });

      return cursos;
  }
};
