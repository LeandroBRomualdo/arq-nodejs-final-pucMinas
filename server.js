// Importa o módulo do Express Framework
const express = require('express')
const app = express()

// Importa o módulo dotenv
const env = require('dotenv').config()

// Importa os módulos para tratamento das rotas
const apiRotasV3 = require('./src/routes/rotasV3')
const apiRotasSeg = require('./src/routes/rotasSeg')

// API versao 3 - Filmes com segurança
app.use('/api/v3', apiRotasV3)

// API com segurança versao 1 - Produtos e filmes
app.use('/api/seg/', apiRotasSeg)

// Inicializa o servidor HTTP na porta especificada
const {APP_PORT: PORT} = process.env
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}...`)
    console.log(`Use ctrl + c para parar o servidor.`)
})