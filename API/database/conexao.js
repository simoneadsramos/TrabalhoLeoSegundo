const {Pool} = require('pg');

require('dotenv').config();

const conexao = {
    user: 'postgres',
    database: 'BD_JOGO',
    host: 'localhost',
    password: 'fatec123*',
    port: 5432,
}

const pool = new Pool({
    user:  conexao.user,
    database:conexao.database,
    host: conexao.host,
    password: conexao.password,
    port: conexao.port,
});

module.exports ={
    pool, conexao
}