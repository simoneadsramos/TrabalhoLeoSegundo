const { Router } = require('express');
const jogo = Router();
const { pool } = require('../database/conexao');

jogo.get('/', (req, res) => {
    const visualizarJogo = async () => {
        const query = `SELECT  * FROM jogo order by  idjogo asc`;
        await pool.query(query).then((result) => {
            if (result.rows.length > 0) {
                res.json(result.rows);
            } else {
                res.json('Não jogo cadastrado no momento!');
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return visualizarJogo();
});

jogo.get('/codigo', (req, res) => {
    const codigoJogo = async () => {
        const query = `SELECT idjogo FROM jogo ORDER BY idjogo DESC LIMIT 1`;
        await pool.query(query).then((result) => {
            if (result.rows.length > 0) {
                res.json(result.rows);
            } else {
                res.json([{ idjogo: 0 }]);
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return codigoJogo();
});

jogo.get('/visualizar/:idJogo', (req, res) => {
    const { idJogo } = req.params;
    const visualizarJogo = async () => {
        const query = `SELECT  * FROM jogo WHERE idJogo = ${idJogo}`;
        await pool.query(query).then((result) => {
            if (result.rows.length > 0) {
                res.json(result.rows);
            } else {
                res.json('Não jogo cadastrado com este número!');
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return visualizarJogo();
});

jogo.post('/cadastrar', (req, res) => {
    const { equipeCasa, equipeVisitante, pontosCasa, pontosVisitante } = req.body;

    let data = new Date();
    data.setDate(data.getDate());
    data = data.toLocaleDateString();
    if (equipeCasa === equipeVisitante) {
        throw new Error('Equipe Visitante é a mesma da Equipe Casa!');
    }
    const cadastrarJogo = async () => {
        const query = `INSERT INTO jogo ( equipe_casa, equipe_visitante, pontos_casa, pontos_visitante, data) VALUES (${equipeCasa}, ${equipeVisitante},  ${pontosCasa}, ${pontosVisitante}, '${data}');`;
        await pool.query(query).then((result) => {
            if (result.rows) {
                res.json('Sucesso ao cadastrar jogo!');
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return cadastrarJogo();
});

jogo.put('/pontos/:idJogo', (req, res) => {
    const { pontosCasa, pontosVisitante } = req.body;
    const { idJogo } = req.params;

    const buscarJogo = async () => {
        const query = `SELECT  * FROM jogo where  idjogo= ${idJogo}`;
        await pool.query(query).then((result) => {
            if (result.rows[0]) {

                if ((pontosCasa >= 0 && pontosVisitante >= 0) && (pontosCasa != null && pontosVisitante != null)) {
                    const pontosJogo = async () => {
                        const query = `UPDATE jogo SET pontos_casa = ${pontosCasa}, pontos_visitante = ${pontosVisitante} WHERE idjogo = ${idJogo};`;
                        await pool.query(query).then((result) => {
                            if (result.rows) {
                                res.json(`Sucesso ao pontuar o jogo de número: ${idJogo}!`);
                            }
                        }).catch((err) => {
                            throw new Error(err);
                        });
                    }
                    return pontosJogo();
                } else {
                    res.json('Pontos informados invalidos ou não informados!');
                }

            } else {
                res.json('Jogo não encontrado! Tente novamente!');
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }

    return buscarJogo();
});


jogo.delete('/deletar/:idJogo', (req, res) => {
    const { idJogo } = req.params;
    const buscarJogo = async () => {
        const query = `SELECT  * FROM jogo where  idjogo= ${idJogo}`;
        await pool.query(query).then((result) => {
            if (result.rows[0]) {
                const excluirJogo = async () => {
                    const query = `DELETE FROM jogo WHERE idjogo = ${idJogo};`;
                    await pool.query(query).then((result) => {
                        if (result.rows) {
                            res.json(`Sucesso ao excluir o jogo de número: ${idJogo}!`);
                        }
                    }).catch((err) => {
                        throw new Error(err);
                    });
                }
                return excluirJogo();
            } else {
                res.json('Jogo não encontrado! Tente novamente!');
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }

    return buscarJogo();

});


jogo.get('/placar', (req, res) => {
    let placar = new Object();
    const visualizarJogo = async () => {
        const query = `SELECT  * FROM jogo order by  idjogo asc`;
        await pool.query(query).then((result) => {
            if (result.rows.length > 0) {
                result.rows.forEach((equipeC, idx, equpeV) => {
                     equpeV.forEach((item, i) => {
                        if (+item.equipe_visitante === +equipeC.equipe_casa && idx !== i) {
                             let soma = +item.pontos_visitante + +equipeC.pontos_casa

                                placar.equipe =  item.equipe_visitante
                                placar.pontuacao = soma
                             
                        }
                    })
                })
                
                console.log(placar)
                res.json(result.rows);
            } else {
                res.json('Não jogo cadastrado no momento!');
            }
        }).catch((err) => {
            throw new Error(err);
        });
    }
    return visualizarJogo();
});

/************
 * this.recebimentosSalvo = res.content.filter((v, i, a) => a.findIndex(t => (t.nome_arquivo === v.nome_arquivo)) === i)
contas.forEach((conta, idx, arr) => {
      repetido = arr.find((item, i) => item.conta.id === conta.conta.id && idx !== i)

 */

module.exports = {
    jogo
}