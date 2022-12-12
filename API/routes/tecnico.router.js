const { Router } = require('express');
const tecnico = Router();
const { pool } = require('../database/conexao');

tecnico.get('/', (req, res) => {
    const visualizarTecnico = async () => {
        const query = `SELECT  * FROM tecnico order by  idtecnico asc`;
        await pool.query(query).then((result) => {
            if (result.rows.length > 0) {
                res.json(result.rows);
            } else {
                res.json('Não há técnico cadastrada no momento!');
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return visualizarTecnico();
});

tecnico.get('/codigo', (req, res) => {
    const codigoTecnico = async () => {
        const query = `SELECT idtecnico FROM tecnico ORDER BY idtecnico DESC LIMIT 1`;
        await pool.query(query).then((result) => {
            if (result.rows.length > 0) {
                res.json(result.rows);
            }else{
                res.json([{idtecnico: 0}]);
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return codigoTecnico();
});

tecnico.get('/visualizar/:idTecnico', (req, res) => {
    const { idTecnico } = req.params;
    const visualizarTecnico = async () => {
        const query = `SELECT  * FROM tecnico WHERE idtecnico = ${idTecnico}`;
        await pool.query(query).then((result) => {
            if (result.rows.length > 0) {
                res.json(result.rows);
            } else {
                res.json('Não técnico cadastrado com este número!');
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return visualizarTecnico();
});

tecnico.post('/cadastrar', (req, res) => {
    const { nome, funcao, equipe } = req.body;
    const visualizarTecnico = async () => {
        const query = `SELECT  * FROM tecnico WHERE nome = '${nome}'`;
        await pool.query(query).then((result) => {
            if (result.rows.length > 0) {
                res.json('Técnico informado ' + nome + ' já esta cadastrada!');
            } else {

                const cadastrarTecnico = async () => {
                    const query = `INSERT INTO tecnico (nome, funcao, equipe_idequipe) VALUES ('${nome}', '${funcao}',${equipe});`;
                    await pool.query(query).then((result) => {
                        if (result.rows) {
                            res.json('Sucesso ao cadastrar técnico!');
                        }
                    }).catch((err) => {
                        throw new Error(err);
                    });
                }
                return cadastrarTecnico();
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return visualizarTecnico();
});

tecnico.put('/atualizar/:idTecnico', (req, res) => {
    const { nome, funcao, equipe } = req.body;
    const { idTecnico } = req.params;
    const visualizarTecnico = async () => {
        const query = `SELECT  * FROM tecnico WHERE idtecnico = ${idTecnico}`;
        await pool.query(query).then((result) => {
            if (result.rows.length > 0) {
                const nomeTecnico = async () => {
                    const query = `SELECT  * FROM tecnico WHERE nome = '${nome}'`;
                    await pool.query(query).then((result) => {
                        if (result.rows.length > 0) {
                            res.json('Técnico informada ' + nome + ' já esta cadastrada!');
                        } else {
                            const atualizarTecnico = async () => {
                                const query = `UPDATE tecnico SET nome = '${nome}' , funcao = '${funcao}', equipe_idequipe = ${equipe} WHERE idtecnico = ${idTecnico};`;
                                await pool.query(query).then((result) => {
                                    if (result.rows) {
                                        res.json('Sucesso ao atulizar Técnico!');
                                    }
                                }).catch((err) => {
                                    throw new Error(err);
                                });
                            }
                            return atualizarTecnico();
                        }
                    }).catch((err) => {
                        throw new Error(err);
                    });
                }
                return nomeTecnico();
            } else {
                res.json('Não Técnico cadastrado com este número!');
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return visualizarTecnico();

});

tecnico.delete('/deletar/:idTecnico', (req, res) => {
    const { idTecnico } = req.params;
    const buscarTecnico = async () => {
        const query = `SELECT  * FROM tecnico where  idtecnico= ${idTecnico}`;
        await pool.query(query).then((result) => {
            if (result.rows[0]) {
                const excluirTecnico = async () => {
                    const query = `DELETE FROM tecnico WHERE idtecnico = ${idTecnico};`;
                    await pool.query(query).then((result) => {
                        if (result.rows) {
                            res.json(`Sucesso ao excluir a Técnico!`);
                        }
                    }).catch((err) => {
                        throw new Error(err);
                    });
                }
                return excluirTecnico();
            } else {
                res.json('Técnico não encontrada! Tente novamente!');
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }

    return buscarTecnico();

});

module.exports = tecnico;