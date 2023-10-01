const knexConfig = require('../../knexfile.js')[process.env.ENV || 'development']
const knex = require('knex')(knexConfig)

function incluirNovoFilme(novoFilme) {
        return knex('filmes').insert(novoFilme)
}

function listarTodosFilmes() {
        return knex('filmes')
}

function buscarFilmePorId(id) {
        return knex('filmes').where({id: id})
}

function alterarFilmePorId(id, filmeComAlteracao) {
        return knex('filmes')
                .where({id: id})
                .update(filmeComAlteracao)
}

function excluirFilmePorId(id) {
        return knex('filmes')
                .where({id: id})
                .del()
}

module.exports = {
        incluirNovoFilme,
        listarTodosFilmes,
        buscarFilmePorId,
        alterarFilmePorId,
        excluirFilmePorId
}