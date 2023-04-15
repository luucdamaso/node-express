const express = require("express");
const { alunosChamada, adicionarAluno, deletarAluno, atualizarAluno } = require("./alunos");
const fs = require("fs");
const app = express();
app.use(express.json());

const dbFilePath = "./db.json";
let alunos = [];


fs.readFile(dbFilePath, (err, data) => {
    if (err) {
        console.error(err);
    } else {
        alunos = JSON.parse(data);
    }
});

app.get("/alunos", (req, res) => {
    const { aluno, matricula, media } = req.query;

    if (aluno) {
        let nomeAluno = alunosChamada.filter(a => a.nome.toLowerCase().includes(aluno.toLowerCase()));
        res.json(nomeAluno)
    }
    if (matricula) {
      let matriculaAluno = alunosChamada.filter(a => a.matricula === Number(matricula));
      res.json(matriculaAluno)
  }
    if (media) {
        let mediaAluno = alunosChamada.filter(a => a.media === Number(media));
        res.json(mediaAluno)
    }

    res.json(alunos);
});

app.put("/alunos/novo", (req, res) =>{
    const {nome, matricula, media} = req.body;
    if((nome !== undefined )||(matricula !== undefined)||(media !== undefined)){
      adicionarAluno({ nome, matricula, media });
        fs.writeFile(dbFilePath, JSON.stringify(alunos), err => {
            if (err) {
                res.status(500).json({message: "Erro ao escrever no arquivo"});
            } else {
                res.json(`${nome} você foi adicionado`);
            }
        });
    }else {
        res.status(400).json({message: "Não foi possivel adicionar"})
    }
});

app.delete("/alunos/deletar/:index", (req, res) =>{
    const {index} = req.params;
    if(index >= 0 && index < alunos.length){
      const alunoExcluido = alunos[index];
      deletarAluno(index);
        fs.writeFile(dbFilePath, JSON.stringify(alunos), err => {
            if (err) {
                res.status(500).json({message: "Erro ao escrever no arquivo"});
            } else {
                res.json(`${alunoExcluido.nome} você foi excluido`);
            }
        });
    }else {
        res.status(400).json({message: "Índice inválido"});
    }
});

app.post("/alunos/atualizar/:index", (req, res) =>{
    const {index} = req.params;
    const {nome, matricula, media} = req.body;
    if(index >= 0 && index < alunos.length ){
        if(nome !== undefined && matricula !== undefined && media !== undefined){
            const alunoAntigo = alunos[index];
            atualizarAluno({nome, matricula, media});
            fs.writeFile(dbFilePath, JSON.stringify(alunos), err => {
                if (err) {
                    alunos[index] = alunoAntigo;
                    res.status(500).json({message: "Erro ao escrever no arquivo"});
                } else {
                    res.json(`O aluno ${alunoAntigo.nome} foi atualizado`);
                }
            });
        } else {
            res.status(400).json({message: "Dados inválidos"});
        }
    }else {
        res.status(400).json({message: "Índice inválido"});
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000/");
});
