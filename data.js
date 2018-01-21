const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {
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

  carregarDadosCurso(curso) {
    const arquivoCurso = __dirname + '/data/' + curso + '.json';
    return jsonfile.readFile(arquivoCurso);
  },

  criarArquivoDeCurso(nome, conteudo) {
    return jsonfile.writeFile(nome, conteudo, { spaces: 2 })
    .then(() => {
      console.log(`Arquivo ${nome} criado!`);
    })
    .catch((err) => {
      console.error(err);
    });
  },

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
};
