const cidade = require("./cidade.router");
const equipe = require("./equipe.router");
const { jogador } = require("./jogador.router");
const { jogo } = require("./jogo.router");
const tecnico = require("./tecnico.router");

const Routes = (app) => {
    app.use('/jogo', jogo);
    app.use('/cidade', cidade);
    app.use('/jogador', jogador);
    app.use('/tecnico', tecnico);
    app.use('/equipe', equipe);
}

module.exports = Routes;
