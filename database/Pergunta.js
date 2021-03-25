const Sequelize = require("Sequelize");
const connection = require("./database");

//definindo uma tabela
const Pergunta = connection.define("perguntas", {
    //propriedades
    titulo:{
        //configurações
        type: Sequelize.STRING,
        allowNull: false
    },
    //propriedade
    descricao:{
        //configurações
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false})
    .then(()=>{console.log("Tabela 'Pergunta' criada")})
    .catch((erro) => {console.log(erro)});

module.exports = Pergunta;