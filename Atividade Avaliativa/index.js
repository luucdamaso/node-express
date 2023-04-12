const express = require("express");
const alunos = require("./alunos.js")

const app = express();
app.use(express.json());

app.get("/alunos", (req, res) => {
    const { aluno, media } = req.query;

    if (aluno) {
        let nomeAluno = alunos.filter(a => a.nome.toLowerCase().includes(aluno.toLowerCase()));
        res.json(nomeAluno)
    }
    if (media) {
        let mediaAluno = alunos.filter(a => a.media === Number(media));
        res.json(mediaAluno)
    }
    res.json(alunos);
});

app.post("/alunos/novo", (req, res) =>{
    const {nome, matricula, media} = req.body;
    if((nome !== undefined )||(matricula !== undefined)||(media !== undefined)){
        res.json(`${nome} você foi adicionado`)
    }else {
        res.status(400).json({message: "Não foi possivel adicionar"})
    }
});

app.post("/alunos/deletar/:index", (req, res) =>{
    const {aluno} = req.body;
    if(nome !== undefined ){
        res.json(`${aluno} você foi excluido`)
    }else {
        res.status(400).json({message: `${aluno} não existe`})
    }
});

app.post("/alunos/atualizar/:index", (req, res) =>{
    const {aluno} = req.body;
    if(nome !== undefined ){
        res.json(`O aluno ${aluno} foi atualizado`)
    }else {
        res.status(400).json({message: `${aluno} não existe`})
    }
});

app.listen(3000, () => {
    //Roda sempre que o servidor incia com sucesso
    console.log("Servidor rodando em http://localhost:3000/");
  });