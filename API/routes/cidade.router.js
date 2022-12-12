const { Router } = require('express');
const cidade = Router();
const { pool } = require('../database/conexao');

cidade.get('/', (req, res) => {
    const visualizarCidade = async () => {
        const query = `SELECT  * FROM cidade`;
        await pool.query(query).then((result) => {
            if (result.rows.length > 0) {
                res.json(result.rows);
            } else {
                res.json('Não cidade cadastrada no momento!');
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return visualizarCidade();
});

cidade.get('/codigo', (req, res) => {
    const codigoCidade = async () => {
        const query = `SELECT idcidade FROM cidade ORDER BY idcidade DESC LIMIT 1`;
        await pool.query(query).then((result) => {
            if (result.rows.length > 0) {
                res.json(result.rows);
            }else{
                res.json([{idcidade: 0}]);
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return codigoCidade();
});

cidade.get('/visualizar/:idCidade', (req, res) => {
    const { idCidade } = req.params;
    const visualizarCidade = async () => {
        const query = `SELECT  * FROM cidade WHERE idcidade = ${idCidade}`;
        await pool.query(query).then((result) => {
            if (result.rows.length > 0) {
                res.json(result.rows);
            } else {
                res.json('Não cidade cadastrado com este número!');
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return visualizarCidade();
});

cidade.post('/cadastrar', (req, res) => {
    const { nome, equipe } = req.body;
    const visualizarCidade = async () => {
        const query = `SELECT  * FROM cidade WHERE nome = '${nome}'`;
        await pool.query(query).then((result) => {
            if (result.rows.length > 0) {
                res.json('Cidade informada ' + nome + ' já esta cadastrada!');
            } else {

                const cadastrarCidade = async () => {
                    const query = `INSERT INTO cidade (nome,time_id) VALUES ('${nome}',${equipe});`;
                    await pool.query(query).then((result) => {
                        if (result.rows) {
                            res.json('Sucesso ao cadastrar cidade!');
                        }
                    }).catch((err) => {
                        throw new Error(err);
                    });
                }
                return cadastrarCidade();
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return visualizarCidade();

});

cidade.put('/atualizar/:idCidade', (req, res) => {
    const { nome, equipe } = req.body;
    const { idCidade } = req.params;
    const visualizarCidade = async () => {
        const query = `SELECT  * FROM cidade WHERE idcidade = ${idCidade}`;
        await pool.query(query).then((result) => {
            if (result.rows.length > 0) {

                const nomeCidade = async () => {
                    const query = `SELECT  * FROM cidade WHERE nome = '${nome}'`;
                    await pool.query(query).then((result) => {
                        if (result.rows.length > 0) {
                            res.json('Cidade informada ' + nome + ' já esta cadastrada!');
                        } else {

                            const atualizarCidade = async () => {
                                const query = `UPDATE cidade SET nome = '${nome}', time_id = ${equipe} WHERE idcidade = ${idCidade};`;
                                await pool.query(query).then((result) => {
                                    if (result.rows) {
                                        res.json('Sucesso ao atulizar cidade!');
                                    }
                                }).catch((err) => {
                                    throw new Error(err);
                                });
                            }
                            return atualizarCidade();
                        }
                    }).catch((err) => {
                        throw new Error(err);
                    });
                }
                return nomeCidade();
            } else {
                res.json('Não cidade cadastrado com este número!');
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return visualizarCidade();

});

cidade.delete('/deletar/:idCidade', (req, res) => {
    const { idCidade } = req.params;
    const buscarCidade = async () => {
        const query = `SELECT  * FROM cidade where  idCidade= ${idCidade}`;
        await pool.query(query).then((result) => {
            if (result.rows[0]) {
                const excluirCidade = async () => {
                    const query = `DELETE FROM cidade WHERE idCidade = ${idCidade};`;
                    await pool.query(query).then((result) => {
                        if (result.rows) {
                            res.json(`Sucesso ao excluir a cidade!`);
                        }
                    }).catch((err) => {
                        throw new Error(err);
                    });
                }
                return excluirCidade();
            } else {
                res.json('Cidade não encontrada! Tente novamente!');
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }

    return buscarCidade();

});

module.exports = cidade;