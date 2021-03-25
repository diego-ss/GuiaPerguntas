const Sequelize = require("Sequelize");
const connection = require("./database");

//definindo tabela
const Resposta = connection.define("respostas", {
    texto: {
        //tipo
        type: Sequelize.TEXT,
        //não nulo
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force: false}).then(()=>{console.log("Tabela 'Respostas' criada")})
.catch((erro) => {console.log(erro)});
module.exports = Resposta;