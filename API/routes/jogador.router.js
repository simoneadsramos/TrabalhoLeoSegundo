const { Router } = require('express');
const jogador = Router();
const { pool } = require('../database/conexao');

jogador.get('/', (req, res) => {
    const visualizarJogador = async () => {
        const query = `SELECT  * FROM jogador order by idjogador asc`;
        await pool.query(query).then((result) => {
            if (result.rows.length > 0) {
                res.json(result.rows);
            } else {
                res.json('Não há jogador cadastrada no momento!');
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return visualizarJogador();
});

jogador.get('/codigo', (req, res) => {
    const codigoJogador = async () => {
        const query = `SELECT idjogador FROM jogador ORDER BY idjogador DESC LIMIT 1`;
        await pool.query(query).then((result) => {
            if (result.rows.length > 0) {
                res.json(result.rows);
            }else{
                res.json([{idjogador: 0}]);
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return codigoJogador();
});

jogador.get('/visualizar/:idJogador', (req, res) => {
    const { idJogador } = req.params;
    const visualizarJogador = async () => {
        const query = `SELECT  * FROM jogador WHERE idjogador = ${idJogador}`;
        await pool.query(query).then((result) => {
            if (result.rows.length > 0) {
                res.json(result.rows);
            } else {
                res.json('Não jogador cadastrado com este número!');
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return visualizarJogador();
});

jogador.post('/cadastrar', (req, res) => {
    const { nome, equipe } = req.body;
    const visualizarJogador = async () => {
        const query = `SELECT  * FROM jogador WHERE nome = '${nome}'`;
        await pool.query(query).then((result) => {
            if (result.rows.length > 0) {
                res.json('Jogador informada ' + nome + ' já esta cadastrada!');
            } else {

                const cadastrarJogador = async () => {
                    const query = `INSERT INTO jogador (nome,equipe_idequipe) VALUES ('${nome}', ${equipe});`;
                    await pool.query(query).then((result) => {
                        if (result.rows) {
                            res.json('Sucesso ao cadastrar Jogador!');
                        }
                    }).catch((err) => {
                        throw new Error(err);
                    });
                }
                return cadastrarJogador();
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return visualizarJogador();
});

jogador.put('/atualizar/:idJogador', (req, res) => {
    const { nome, equipe } = req.body;
    const { idJogador } = req.params;
    const visualizarJogador = async () => {
        const query = `SELECT  * FROM jogador WHERE idjogador = ${idJogador}`;
        await pool.query(query).then((result) => {
            if (result.rows.length > 0) {

                const nomeJogador = async () => {
                    const query = `SELECT  * FROM jogador WHERE nome = '${nome}'`;
                    await pool.query(query).then((result) => {
                        if (result.rows.length > 0) {
                            res.json('Jogador ' + nome + ' já esta cadastrada!');
                        } else {

                            const atualizarJogador = async () => {
                                const query = `UPDATE jogador SET nome = '${nome}', equipe_idequipe =${equipe}  WHERE idjogador = ${idJogador};`;
                                await pool.query(query).then((result) => {
                                    if (result.rows) {
                                        res.json('Sucesso ao atulizar Jogador!');
                                    }
                                }).catch((err) => {
                                    throw new Error(err);
                                });
                            }
                            return atualizarJogador();
                        }
                    }).catch((err) => {
                        throw new Error(err);
                    });
                }
                return nomeJogador();
            } else {
                res.json('Não Jogador cadastrado com este número!');
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return visualizarJogador();

});


jogador.delete('/deletar/:idJogador', (req, res) => {
    const { idJogador } = req.params;
    const buscarJogador = async () => {
        const query = `SELECT  * FROM jogador where  idjogador= ${idJogador}`;
        await pool.query(query).then((result) => {
            if (result.rows[0]) {
                const excluirJogador = async () => {
                    const query = `DELETE FROM jogador WHERE idjogador = ${idJogador};`;
                    await pool.query(query).then((result) => {
                        if (result.rows) {
                            res.json(`Sucesso ao excluir a Jogador!`);
                        }
                    }).catch((err) => {
                        throw new Error(err);
                    });
                }
                return excluirJogador();
            } else {
                res.json('Jogador não encontrada! Tente novamente!');
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }

    return buscarJogador();

});

module.exports = {
    jogador
}