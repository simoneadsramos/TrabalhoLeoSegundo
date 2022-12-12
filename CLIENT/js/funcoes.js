// vai requisitar uma API
async function consulta() {
    await consultarPlacar();
    await consultarJogo()
    await consultarJogador()
    await consultarCidade()
    await consultarTecnico();
    await consultarEquipe()
}

async function consultarPlacar() {

    let dados = await fetch('http://localhost:3001/jogo/placar')
        .then(response => {
            return response.json()
        })
        .catch(error => {
            alert(error)
        })
    let resposta = ''
    if (typeof dados !== 'string') {
        dados.map(dado => {
            resposta += `<tr><td> ${dado.idjogo} </td> <td> ${dado.equipe_casa} </td><td> ${dado.equipe_visitante} </td> </tr>`
        })
        document.getElementById("conteudoTabela").innerHTML = resposta;
    } else {
        document.getElementById("zero").innerHTML = '    ' + dados;
    }
}




async function cadastrarJogo() {
    // recuperar os dados do usuário
    let idJogo = document.getElementById("idJogo").value
    let equipeCasa = Number(document.getElementById("equipeCasa").value)
    let equipeVisitante = Number(document.getElementById("equipeVisitante").value)
    let pontosCasa = Number(document.getElementById("pontosCasa").value)
    let pontosVisitante = Number(document.getElementById("pontosVisitante").value)
    let dado
    let metodo // vai conter POST ou PUT
    if (idJogo) { // vai atualizar
        metodo = 'PUT'
        dado = {
            idJogo, pontosCasa, pontosVisitante,
        }

        if (pontosCasa === undefined) {
            pontosCasa = 0;
        }
        if (pontosVisitante === undefined) {
            pontosVisitante = 0;
        }
        let reposta = await fetch(`http://localhost:3001/jogo/pontos/${idJogo}`, {
            method: metodo,
            body: JSON.stringify(dado),
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        }).then(resposta => {
            return resposta.json();
        })
            .catch(error => {
                console.log(error)
                return error
            })
        alert(reposta)
        consultarJogo()
    } else { // cadastrar
        if (equipeCasa === 0) {
            return alert('Preencha com um valor válido a Equipe Casa! Ex: 1');
        }
        if (equipeVisitante === 0) {
            return alert('Preencha com um valor válido a Equipe Visitante! Ex: 2');
        }
        if (equipeCasa === equipeVisitante) {
            consultarJogo();
            return alert(' Equipe Visitante é a mesma da Equipe Casa!');
        } else {
            if (pontosCasa === undefined) {
                pontosCasa = 0;
            }
            if (pontosVisitante === undefined) {
                pontosVisitante = 0;
            }
            metodo = 'POST'
            dado = {
                equipeCasa, equipeVisitante, pontosCasa, pontosVisitante,
            }

            let reposta = await fetch('http://localhost:3001/jogo/cadastrar', {
                method: metodo,
                body: JSON.stringify(dado),
                headers: { "Content-Type": "application/json; charset=UTF-8" }
            }).then(resposta => {
                return resposta.json();
            })
                .catch(error => {
                    console.log(error)
                    return error
                })
            alert(reposta)
            document.location.reload();
        }

    }

}

async function consultarJogo() {

    let data = new Date();
    data.setDate(data.getDate());
    data = data.toLocaleDateString();
    document.getElementById("dataJogo").value = data

    let codigoJogo = await fetch('http://localhost:3001/jogo/codigo')
        .then(response => {
            return response.json()
        })
        .catch(error => {
            alert(error)
        })
    document.getElementById("codigoJogo").value = codigoJogo[0].idjogo + 1;
    let dados = await fetch('http://localhost:3001/jogo/')
        .then(response => {
            return response.json()
        })
        .catch(error => {
            alert(error)
        })
    let resposta = ''
    if (typeof dados !== 'string') {
        dados.map(dado => {
            resposta += `<tr><td> ${dado.idjogo} </td> <td> ${dado.equipe_casa} </td><td> ${dado.equipe_visitante} </td> <td> ${dado.pontos_casa} </td> <td> ${dado.pontos_visitante} </td><td> ${dado.data} </td> <td> <i onClick="atualizaJogo(${dado.idjogo}, '${dado.equipe_casa}', '${dado.equipe_visitante}', '${dado.pontos_casa}',' ${dado.pontos_visitante}','${dado.data}')" class='bi bi-pencil'></i></td> <td> <i onClick='remove(${dado.idjogo})' class='bi bi-trash'></i> </td> </tr>`
        })
        document.getElementById("conteudoJogoTabela").innerHTML = resposta;
    } else {
        document.getElementById("zeroJogo").innerHTML = '    ' + dados;
    }
}

// remove um pokemon do banco de dados
// quem chamar a função remove pode fazer outra ação antes de
// receber resposta
async function remove(id) {
    let confirma = confirm(`Confirma exclusão do Jogo? `);
    if (confirma) { // confirma é true
        // chama a api -> é síncrona (aguardamos o retorna do servidor)
        let resposta = await fetch(`http://localhost:3001/jogo/deletar/${id}`, {
            method: 'DELETE'
        })
            .then(response => { // quando o servidor retornou
                return response.json();
            })
            .catch(error => { // houve erro na comunicação com servidor
                alert(error)
            })
        alert(resposta)
        document.location.reload();
    }



}

function atualizaJogo(idJogo, equipeCasa, equipeVisitante, pontosCasa, pontosVisitante, dataJogo) {

    document.getElementById("idJogo").value = idJogo;
    document.getElementById("equipeCasa").value = equipeCasa;
    document.getElementById("equipeVisitante").value = equipeVisitante;
    document.getElementById("pontosCasa").value = pontosCasa;
    document.getElementById("pontosVisitante").value = pontosVisitante;
    document.getElementById("dataJogo").value = dataJogo;
    document.getElementById("codigoJogo").value = idJogo;

    // document.getElementById('CadastrarJogo').addEventListener('click');
}

async function limparJogo() {
    let data = new Date();
    data.setDate(data.getDate());
    data = data.toLocaleDateString();
    document.getElementById("dataJogo").value = data
    let codigoJogo = await fetch('http://localhost:3001/jogo/codigo')
        .then(response => {
            return response.json()
        })
        .catch(error => {
            alert(error)
        })
    document.getElementById("equipeCasa").value = '';
    document.getElementById("equipeVisitante").value = '';
    document.getElementById("pontosCasa").value = '';
    document.getElementById("pontosVisitante").value = '';
    document.getElementById("idJogo").value = '';
    document.getElementById("codigoJogo").value = codigoJogo[0].idjogo + 1;
}



//********************************************************************************************** */


async function cadastrarJogador() {
    // recuperar os dados do usuário
    let idJogador = document.getElementById("idJogador").value
    let nome = document.getElementById("nomeJogador").value
    let equipe = Number(document.getElementById("equipeJogador").value)
    let dado
    let metodo // vai conter POST ou PUT
    if (idJogador) { // vai atualizar
        metodo = 'PUT'
        dado = {
            idJogador, nome, equipe,
        }


        let reposta = await fetch(`http://localhost:3001/jogador/atualizar/${idJogador}`, {
            method: metodo,
            body: JSON.stringify(dado),
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        }).then(resposta => {
            return resposta.json();
        })
            .catch(error => {
                console.log(error)
                return error
            })
        alert(reposta)
        document.location.reload();
    } else { // cadastrar
        if (nome === '') {
            return alert('Preencha o nome do Jogador!');
        }
        metodo = 'POST'
        dado = {
            nome, equipe
        }

        let reposta = await fetch('http://localhost:3001/jogador/cadastrar', {
            method: metodo,
            body: JSON.stringify(dado),
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        }).then(resposta => {
            return resposta.json();
        })
            .catch(error => {
                console.log(error)
                return error
            })
        alert(reposta)
        document.location.reload();
    }

}


async function consultarJogador() {

    let codigoJogador = await fetch('http://localhost:3001/jogador/codigo')
        .then(response => {
            return response.json()
        })
        .catch(error => {
            alert(error)
        })
    document.getElementById("codigoJogador").value = codigoJogador[0].idjogador + 1;
    let dados = await fetch('http://localhost:3001/jogador/')
        .then(response => {
            return response.json()
        })
        .catch(error => {
            alert(error)
        })
    let resposta = ''
    if (typeof dados !== 'string') {
        dados.map(dado => {
            resposta += `<tr><td> ${dado.idjogador} </td> <td> ${dado.nome} </td><td> ${dado.equipe_idequipe} </td>  <td> <i onClick="atualizaJogador(${dado.idjogador}, '${dado.nome}', '${dado.equipe_idequipe}')" class='bi bi-pencil'></i></td> <td> <i onClick='removeJogador(${dado.idjogador})' class='bi bi-trash'></i> </td> </tr>`
        })
        document.getElementById("conteudoJogadorTabela").innerHTML = resposta;
    } else {
        document.getElementById("zeroJogador").innerHTML = '    ' + dados;
    }
}

// remove um pokemon do banco de dados
// quem chamar a função remove pode fazer outra ação antes de
// receber resposta
async function removeJogador(id) {
    let confirma = confirm(`Confirma exclusão do Jogador? `);
    if (confirma) { // confirma é true
        // chama a api -> é síncrona (aguardamos o retorna do servidor)
        let resposta = await fetch(`http://localhost:3001/jogador/deletar/${id}`, {
            method: 'DELETE'
        })
            .then(response => { // quando o servidor retornou
                return response.json();
            })
            .catch(error => { // houve erro na comunicação com servidor
                alert(error)
            })
        alert(resposta)
        consultarJogador();
    }



}

function atualizaJogador(idJogador, nome, equipe) {

    document.getElementById("idJogador").value = idJogador;
    document.getElementById("nomeJogador").value = nome;
    document.getElementById("equipeJogador").value = equipe;
    document.getElementById("codigoJogador").value = idJogador;

}

async function limparJogador() {

    let codigoJogador = await fetch('http://localhost:3001/jogador/codigo')
        .then(response => {
            return response.json()
        })
        .catch(error => {
            alert(error)
        })
    document.getElementById("nomeJogador").value = ' ';
    document.getElementById("idJogador").value = '';
    document.getElementById("equipeJogador").value = '';
    document.getElementById("codigoJogador").value = codigoJogador[0].idjogador + 1;
}



/***************************************************************************************** */

async function cadastrarCidade() {
    // recuperar os dados do usuário
    let idCidade = document.getElementById("idCidade").value
    let nome = document.getElementById("nomeCidade").value
    let equipe = Number(document.getElementById("equipeCidade").value)
    let dado
    let metodo // vai conter POST ou PUT
    if (idCidade) { // vai atualizar
        metodo = 'PUT'
        dado = {
            idCidade, nome, equipe
        }


        let reposta = await fetch(`http://localhost:3001/cidade/atualizar/${idCidade}`, {
            method: metodo,
            body: JSON.stringify(dado),
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        }).then(resposta => {
            return resposta.json();
        })
            .catch(error => {
                console.log(error)
                return error
            })
        alert(reposta)
        document.location.reload();
    } else { // cadastrar
        if (nome === '') {
            return alert('Preencha o nome da Cidade !');
        }
        metodo = 'POST'
        dado = {
            nome, equipe
        }

        let reposta = await fetch('http://localhost:3001/cidade/cadastrar', {
            method: metodo,
            body: JSON.stringify(dado),
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        }).then(resposta => {
            return resposta.json();
        })
            .catch(error => {
                console.log(error)
                return error
            })
        alert(reposta)
        document.location.reload();
    }

}


async function consultarCidade() {

    let codigoCidade = await fetch('http://localhost:3001/cidade/codigo')
        .then(response => {
            return response.json()
        })
        .catch(error => {
            alert(error)
        })
    document.getElementById("codigoCidade").value = codigoCidade[0].idcidade + 1;
    let dados = await fetch('http://localhost:3001/cidade/')
        .then(response => {
            return response.json()
        })
        .catch(error => {
            alert(error)
        })
    let resposta = ''
    if (typeof dados !== 'string') {
        dados.map(dado => {
            resposta += `<tr><td> ${dado.idcidade} </td> <td> ${dado.nome} </td><td> ${dado.time_id} </td>  <td> <i onClick="atualizaCidade(${dado.idcidade}, '${dado.nome}', '${dado.time_id}')" class='bi bi-pencil'></i></td> <td> <i onClick='removeCidade(${dado.idcidade})' class='bi bi-trash'></i> </td> </tr>`
        })
        document.getElementById("conteudoCidadeTabela").innerHTML = resposta;
    } else {
        document.getElementById("zeroCidade").innerHTML = '    ' + dados;
    }
}

// remove um pokemon do banco de dados
// quem chamar a função remove pode fazer outra ação antes de
// receber resposta
async function removeCidade(id) {
    let confirma = confirm(`Confirma exclusão do Cidade? `);
    if (confirma) { // confirma é true
        // chama a api -> é síncrona (aguardamos o retorna do servidor)
        let resposta = await fetch(`http://localhost:3001/cidade/deletar/${id}`, {
            method: 'DELETE'
        })
            .then(response => { // quando o servidor retornou
                return response.json();
            })
            .catch(error => { // houve erro na comunicação com servidor
                alert(error)
            })
        alert(resposta)
        consultarCidade();
    }



}

function atualizaCidade(idCidade, nome, equipe) {

    document.getElementById("idCidade").value = idCidade;
    document.getElementById("nomeCidade").value = nome;
    document.getElementById("equipeCidade").value = equipe;
    document.getElementById("codigoCidade").value = idCidade;

}

async function limparCidade() {

    let codigoCidade = await fetch('http://localhost:3001/cidade/codigo')
        .then(response => {
            return response.json()
        })
        .catch(error => {
            alert(error)
        })
    document.getElementById("nomeCidade").value = ' ';
    document.getElementById("idCidade").value = '';
    document.getElementById("equipeCidade").value = '';
    document.getElementById("codigoCidade").value = codigoCidade[0].idcidade + 1;
}

/************************************************************************************************************** */

async function cadastrarTecnico() {
    // recuperar os dados do usuário
    let idTecnico = document.getElementById("idTecnico").value
    let nome = document.getElementById("nomeTecnico").value
    let funcao = document.getElementById("funcaoTecnico").value
    let equipe = Number(document.getElementById("equipeTecnico").value)
    let dado
    let metodo // vai conter POST ou PUT
    if (idTecnico) { // vai atualizar
        metodo = 'PUT'
        dado = {
            idTecnico, nome, funcao, equipe
        }

        if (nome === '') {
            return alert('Preencha o nome do Técnico!');
        }
        if (funcao === '') {
            return alert('Preencha a função do Técnico!');
        }
        let reposta = await fetch(`http://localhost:3001/tecnico/atualizar/${idTecnico}`, {
            method: metodo,
            body: JSON.stringify(dado),
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        }).then(resposta => {
            return resposta.json();
        })
            .catch(error => {
                console.log(error)
                return error
            })
        alert(reposta)
        document.location.reload();
    } else { // cadastrar

        if (nome === '') {
            return alert('Preencha o nome do Técnico!');
        }
        if (funcao === '') {
            return alert('Preencha a função do Técnico!');
        }
        metodo = 'POST'
        dado = {
            nome, funcao, equipe,
        }

        let reposta = await fetch('http://localhost:3001/tecnico/cadastrar', {
            method: metodo,
            body: JSON.stringify(dado),
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        }).then(resposta => {
            return resposta.json();
        })
            .catch(error => {
                console.log(error)
                return error
            })
        alert(reposta)
        document.location.reload();
    }
}

async function consultarTecnico() {

    let codigoTecnico = await fetch('http://localhost:3001/tecnico/codigo')
        .then(response => {
            return response.json()
        })
        .catch(error => {
            alert(error)
        })
    document.getElementById("codigoTecnico").value = codigoTecnico[0].idtecnico + 1;
    let dados = await fetch('http://localhost:3001/tecnico/')
        .then(response => {
            return response.json()
        })
        .catch(error => {
            alert(error)
        })
    let resposta = ''
    if (typeof dados !== 'string') {
        dados.map(dado => {
            resposta += `<tr><td> ${dado.idtecnico} </td> <td> ${dado.nome} </td><td> ${dado.funcao} </td> <td> ${dado.equipe_idequipe} </td>  <td> <i onClick="atualizaTecnico(${dado.idtecnico}, '${dado.nome}', '${dado.funcao}', '${dado.equipe_idequipe}')" class='bi bi-pencil'></i></td> <td> <i onClick='removeTecnico(${dado.idtecnico})' class='bi bi-trash'></i> </td> </tr>`
        })
        document.getElementById("conteudoTecnicoTabela").innerHTML = resposta;
    } else {
        document.getElementById("zeroTecnico").innerHTML = '    ' + dados;
    }
}


async function removeTecnico(id) {
    let confirma = confirm(`Confirma exclusão do Técnico? `);
    if (confirma) { // confirma é true
        // chama a api -> é síncrona (aguardamos o retorna do servidor)
        let resposta = await fetch(`http://localhost:3001/tecnico/deletar/${id}`, {
            method: 'DELETE'
        })
            .then(response => { // quando o servidor retornou
                return response.json();
            })
            .catch(error => { // houve erro na comunicação com servidor
                alert(error)
            })
        alert(resposta)
        consultarTecnico();
    }



}

function atualizaTecnico(idTecnico, nome, funcao, equipeTecnico) {

    document.getElementById("idTecnico").value = idTecnico;
    document.getElementById("nomeTecnico").value = nome;
    document.getElementById("funcaoTecnico").value = funcao;
    document.getElementById("equipeTecnico").value = equipeTecnico;
    document.getElementById("codigoTecnico").value = idTecnico;

    // document.getElementById('CadastrarJogo').addEventListener('click');
}

async function limparTecnico() {
    let codigoTecnico = await fetch('http://localhost:3001/tecnico/codigo')
        .then(response => {
            return response.json()
        })
        .catch(error => {
            alert(error)
        })
    document.getElementById("nomeTecnico").value = '';
    document.getElementById("funcaoTecnico").value = '';
    document.getElementById("equipeTecnico").value = '';
    document.getElementById("idTecnico").value = '';
    document.getElementById("codigoTecnico").value = codigoTecnico[0].idtecnico + 1;
}


/********************************************************************************************************** */

async function cadastrarEquipe() {
    // recuperar os dados do usuário
    let idEquipe = Number(document.getElementById("codigoEquipe").value)
    let dado
    let metodo // vai conter POST ou PUT

    if (idEquipe == 0) {
        return alert('Preencha com um valor válido a Equipe! Ex: 1');
    }

    metodo = 'POST'
    dado = {
        idEquipe
    }

    let reposta = await fetch('http://localhost:3001/equipe/cadastrar', {
        method: metodo,
        body: JSON.stringify(dado),
        headers: { "Content-Type": "application/json; charset=UTF-8" }
    }).then(resposta => {
        return resposta.json();
    })
        .catch(error => {
            console.log(error)
            return error
        })
    alert(reposta)
   consultarEquipe();
}

async function consultarEquipe() {

    let dados = await fetch('http://localhost:3001/equipe/')
        .then(response => {
            return response.json()
        })
        .catch(error => {
            alert(error)
        })
    let resposta = ''
    if (typeof dados !== 'string') {
        dados.map(dado => {
            resposta += `<tr><td> ${dado.idequipe} </td> <td> <i onClick="atualizaEquipe(${dado.idequipe})" class='bi bi-pencil'></i></td> <td> <i onClick='removeEquipe(${dado.idequipe})' class='bi bi-trash'></i> </td> </tr>`
        })
        document.getElementById("conteudoEquipeTabela").innerHTML = resposta;
    } else {
        document.getElementById("zeroEquipe").innerHTML = '    ' + dados;
    }
}

async function removeEquipe(id) {
    let confirma = confirm(`Confirma exclusão do Jogo? `);
    if (confirma) {
        let resposta = await fetch(`http://localhost:3001/equipe/deletar/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                return response.json();
            })
            .catch(error => {
                alert(error)
            })
        alert(resposta)
        consultarEquipe();
    }



}

function atualizaEquipe(idEquipe) {

    document.getElementById("idEquipe").value = idEquipe;
    document.getElementById("codigoEquipe").value = idEquipe;

}

async function limparEquipe() {
    document.getElementById("idEquipe").value = '';
}
