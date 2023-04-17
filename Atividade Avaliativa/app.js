const express = require("express")
const {alunos, adicionarAluno, atualizarAluno, deletarAluno,  } = require("./alunos");
const morgan = require("morgan");
const fs = require("fs");
const app = express();
app.use(express.json());
app.use(morgan(":method :url :status :response-time ms - :res[content-length]"));

app.get("/alunos", (req, res) => {
    const {aluno, matricula, media} = req.query;

    let listaAlunos = alunos;

    if(aluno) {
        listaAlunos = alunos.filter(a => a.nome.toLowerCase().includes(aluno.toLocaleLowerCase()));
    }  
    if (matricula) {
        listaAlunos = alunos.filter(a => a.matricula === Number(matricula));
    } 
     if (media) {
        listaAlunos = alunos.filter(a => a.media === Number(media));
    } 
    res.json(listaAlunos);
})

app.post("/alunos/novo", (req, res) => {
    const {nome, matricula, media} = req.body;
    let novoAluno = {};
    if((nome !== undefined)||(matricula !== undefined)||( media !== undefined)) {
        novoAluno = {nome, matricula, media};
        adicionarAluno(novoAluno);
        res.status(201).json({ mensagem: "Novo aluno criado com sucesso" });
    } else {
        res.status(400).json({ mensagem: "Os campos nome, matricula e media são obrigatórios" });
    }
    fs.writeFile("db.json", JSON.stringify(alunos), (err) => {
        if (err) throw err;
        console.log("Arquivo db.json atualizado com sucesso");
    });
    res.status(201).json({ mensagem: "Novo aluno criado com sucesso" });
});

app.delete("/alunos/deletar/:index", (req, res) => {
    const index = Number(req.params.index);
    if (index !== undefined && index < alunos.length){
        deletarAluno;
        res.status(200).json({ mensagem: `removido com sucesso` });
    } else {
        res.status(400).json({ mensagem: "O índice informado é inválido" });
    }
    fs.writeFile("db.json", JSON.stringify(alunos), (err) => {
        if (err) throw err;
        console.log("Arquivo db.json atualizado com sucesso");
    });
    res.status(200).json({ mensagem: `removido com sucesso` });
});

app.put("/alunos/atualizar/:index", (req, res) => {
    const index = Number(req.params.index);
    const novoAluno = req.body;
    if (index !== undefined && index < alunos.length){
        atualizarAluno;
        res.status(200).json({ mensagem: `${novoAluno.nome} atualizado com sucesso` });
    } else {
        res.status(400).json({ mensagem: "O índice informado é inválido" });
    }
    fs.writeFile("db.json", JSON.stringify(alunos), (err) => {
        if (err) throw err;
        console.log("Arquivo db.json atualizado com sucesso");
    });
    res.status(200).json({ mensagem: `${novoAluno.nome} atualizado com sucesso` });
});
  

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000/");
});