const e = require('express');
const { Router } = require('express');
const equipe = Router();
const { pool } = require('../database/conexao');

equipe.get('/', (req, res) => {
    const visualizarEquipe = async () => {
        const query = `select * from equipe order by idequipe asc`;
        await pool.query(query).then((result) => {
            if (result.rows.length > 0) {
                res.json(result.rows);
            } else {
                res.json('Não há equipe cadastrada no momento!');
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return visualizarEquipe();
});

equipe.get('/visualizar/:idEquipe', (req, res) => {
    const { idEquipe } = req.params;
    const visualizarEquipe = async () => {
        const query = `SELECT  * FROM equipe WHERE idequipe = ${idEquipe}`;
        await pool.query(query).then((result) => {
            if (result.rows.length > 0) {
                res.json(result.rows);
            } else {
                res.json('Não equipe cadastrado com este número!');
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return visualizarEquipe();
});

equipe.post('/cadastrar', (req, res) => {
    const { idEquipe} = req.body;
    const visualizarEquipe = async () => {
        const query = `SELECT  * FROM equipe WHERE idequipe = ${idEquipe}`;
        await pool.query(query).then((result) => {
            if (result.rows.length > 0) {
                res.json('Equipe informada já esta cadastrada!');
            } else {
                const cadastrarEquipe = async () => {
                    const query = `INSERT INTO equipe (idequipe) VALUES (${idEquipe});`;
                    await pool.query(query).then((result) => {
                        if (result.rows) {
                            res.json('Sucesso em cadastradar a Equipe')
                        }
                    }).catch((err) => {
                        throw new Error(err);
                    });
                }
                return cadastrarEquipe();
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return visualizarEquipe();
});


equipe.delete('/deletar/:idEquipe', (req, res)=> {
    const {idEquipe} = req.params
    const excluirJogador = async () => { //verificar
        const query = `DELETE FROM equipe WHERE idequipe = ${idEquipe};`;
        await pool.query(query).then((result) => {
            if (result.rows) {
                res.json(`Sucesso ao excluir a Equipe!`);
            }
        }).catch((err) => {
            res.json('Por gentileza desvincule a Equipe da Cidade, Jogador, Jogo, Tecnico para realizar a exclusão!')
        });
    }
    return excluirJogador();
})

module.exports = equipe;