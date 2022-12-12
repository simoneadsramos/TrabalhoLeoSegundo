const express = require('express');
const Routes  = require('./routes/router');
const { conexao } = require('./database/conexao');
var cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json());
Routes(app)

const porta = process.env.PORT ||  3001;

app.listen(porta, () => {
    console.log('Servidor esta online na porta: ' + porta +'.');
    console.log('Banco conectado: ' + conexao.database + '.');
   // console.log('Host do Banco: ' + conexao.host + '.');
});

