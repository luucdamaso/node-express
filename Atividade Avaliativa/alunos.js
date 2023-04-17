const alunos = [
  { nome: 'João', matricula: 582, media: 7.5 },
  { nome: 'Maria', matricula: 362, media: 8.2 },
  { nome: 'Pedro', matricula: 741, media: 6.9 },
  { nome: 'Ana', matricula: 957, media: 9.1 },
  { nome: 'Thiago', matricula: 203, media: 5.4 },
  ];

  function adicionarAluno(aluno) {
      alunos.push(aluno);
    }
    
    function deletarAluno(index) {
      alunosChamada.splice(index, 1);
    }
    
    function atualizarAluno(index, novoAluno) {
      alunos[index] = novoAluno;
    }

  module.exports = {alunos, adicionarAluno, atualizarAluno, deletarAluno};