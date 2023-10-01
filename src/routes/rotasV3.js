const express = require('express')

const controladoraFilmes = require('../controllers/controladoraFilmes')
const controladoraUsuarios = require('../controllers/controladoraUsuarios')
const {checkToken, isAdmin} = require('../routes/rotasSeg')

const rotasV3 = express.Router()

// Gera log das requisições
rotasV3.use(
    (req, res, next) => {
        console.log(new Date().toLocaleString(), "-", req.ip, "-", req.method, req.url)
        next()
    }
)

// Configurações das rotas
rotasV3.use(express.json())
rotasV3.use(express.urlencoded({extended: true}))

rotasV3.get('/', function(req, res){
    res.sendFile('index.html', { root: '.' })
})

// Rotas da filmes
rotasV3.post('/filmes/', checkToken, isAdmin, controladoraFilmes.incluirFilme)
rotasV3.get('/filmes/', checkToken, controladoraFilmes.obterTodosFilmes)
rotasV3.get('/filmes/:id', checkToken, controladoraFilmes.obterFilmeEspecifico)
rotasV3.put('/filmes/:id', checkToken, isAdmin, controladoraFilmes.alterarFilme)
rotasV3.delete('/filmes/:id', checkToken, isAdmin, controladoraFilmes.excluirFilme)

//Rotas de usuários
rotasV3.post('/usuarios/', controladoraUsuarios.incluirUsuario)
rotasV3.post('/administradores/', checkToken, isAdmin, controladoraUsuarios.incluirAdministrador)
rotasV3.delete('/usuarios/', checkToken, isAdmin, controladoraUsuarios.excluirUsuario)

rotasV3.use(
    (req, res) => {
        res.statusCode = 404
        res.send('Página não encontrada!')
    }
)

module.exports = rotasV3