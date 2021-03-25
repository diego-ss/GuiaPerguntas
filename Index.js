//importando express
const express = require("express");
//inicializando express
const app = express();
//importando bodyparser (para pegar dados do form de requisição)
const bodyParser = require("body-parser");
//carregando conexão bd
const connection = require("./database/database");
//puxando model da pergunta
const PerguntaDAO = require("./database/Pergunta");

//DATABASE
connection.authenticate()
    .then(()=>{
        console.log("conexão com o bd feita com sucesso!");
    })
    .catch((erro) => {
        console.error(erro);
    });



//informando ao express que a view engine é o ejs
app.set("view engine", "ejs");
//configurando pasta publica
app.use(express.static('public'));
//configurando bodyparser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//rotas
//rota principal
app.get("/", (req, res) => {
    //buscando dados no bd
    //raw true limpa o resultado
    PerguntaDAO.findAll({
        raw:true, 
        order: [['id', 'DESC']] //ORDENANDO DESCRESCENTEMENTE
    }).then(perguntas =>{
        //renderiza a página index com os parâmetros especificados
        res.render("index", {
            perguntas: perguntas
        });
    });    
});

//rota de realizar perguntas
app.get("/perguntar", (req, res) => {
    //renderiza a página perguntar com os parâmetros especificados
    res.render("perguntar");
});

//rota para enviar os dados do formulário de pergunta
app.post("/salvarpergunta", (req, res) => {
     const titulo = req.body.titulo;
     const descricao = req.body.descricao;

     //pegando o model da tabela para salvar dados
     PerguntaDAO.create({
         titulo: titulo,
         descricao: descricao
     }).then(() => {
         //redirecionando para a página principal
        res.redirect("/");
     }).catch((erro) => {
        res.send(erro);
     });

});

app.get("/pergunta/:id", (req, res) => {
    const id = req.params["id"];

    PerguntaDAO.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta){
            res.render("pergunta", {
                pergunta: pergunta
            });
        } else {
            res.redirect("/");
        }
    });
});


app.listen(8080, ()=> {
    console.log("App rodando!");
});