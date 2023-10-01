// Importa o módulo repositório de filmes
const repositorioFilmes = require('../repositories/repositorioFilmes')

// Importa o módulo modelo de filme
const modelosFilmes = require('../models/modelosFilmes')

function incluirFilme(req, res) {
    try {
        const modelo = modelosFilmes.modeloFilmeV1
        const dadosFilmeInserir = req.body
        repositorioFilmes.incluirNovoFilme(modelo.parse(dadosFilmeInserir))
            .then(filmes => {
                return res.status(200).json({status: "OK", mensagem: "Filme inserido com sucesso!"})
            })
            .catch(err => {
                return res.status(500).json({status: "NOK", mensagem: `Erro ao inserir registro no banco de dados: ${err.message}`})
            })
    } catch(err) {
        return res.status(400).json({status: "NOK", mensagem: `Falha na requisição: ${err.message}`})
    }
}

function obterTodosFilmes(req, res) {
    repositorioFilmes.listarTodosFilmes()
        .then(filmes => {
            return res.status(200).json(filmes)
        })
        .catch(err => {
            return res.status(500).json({status: "NOK", mensagem: `Erro ao recuperar registros do banco de dados: ${err.message}`})
        })
}

function obterFilmeEspecifico(req, res) {
    const idFilme = parseInt(req.params.id)
    repositorioFilmes.buscarFilmePorId(idFilme)
        .then(filmes => {
            if (filmes.length) {
                return res.status(200).json(filmes[0])
            }
            return res.status(404).json({status: "NOK", mensagem: "Filme não cadastrado."})
        })
        .catch(err => {
            return res.status(500).json({status: "NOK", mensagem: `Erro ao recuperar registro do banco de dados: ${err.message}`})
        })
    
}

function alterarFilme(req, res) {
    try {
        const modelo = modelosFilmes.modeloFilmeV1
        const idFilme = parseInt(req.params.id)
        const dadosFilmeAlterar = req.body
        modelo.parse(dadosFilmeAlterar)
        repositorioFilmes.alterarFilmePorId(idFilme, dadosFilmeAlterar)
            .then(filmes => {
                if (filmes) {
                    return res.status(200).json({status: "OK", mensagem: "Filme alterado com sucesso!"})
                }
                return res.status(404).json({status: "NOK", mensagem: "Filme não cadastrado."})
            })
            .catch(err => {
                return res.status(500).json({status: "NOK", mensagem: `Erro ao alterar registro no banco de dados: ${err.message}`})
            })
    } catch(err) {
        return res.status(400).json({status: "NOK", mensagem: `Falha na requisição: ${err.message}`})
    }
}

function excluirFilme(req, res) {
    const idFilme = parseInt(req.params.id)
    repositorioFilmes.excluirFilmePorId(idFilme)
        .then(filmes => {
            if (filmes) {
                return res.status(200).json({status: "OK", mensagem: "Filme excluído com sucesso."})
            }
            return res.status(404).json({status: "NOK", mensagem: "Filme não cadastrado."})
        })
        .catch(err => {
            return res.status(500).json({status: "NOK", mensagem: `Erro ao excluir registro do banco de dados: ${err.message}`})
        })
}

module.exports = {
    incluirFilme,
    obterTodosFilmes,
    obterFilmeEspecifico,
    alterarFilme,
    excluirFilme
}