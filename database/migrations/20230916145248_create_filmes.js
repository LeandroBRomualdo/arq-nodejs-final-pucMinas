/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('filmes', (table) => {
        table.increments('id')
        table.string('title', 100).notNullable()
        table.integer('year').notNullable().defaultTo(0)
        table.string('cast', 100).notNullable()
        table.string('genre', 100).notNullable()
        table.string('href', 100).nullable().defaultTo(null)
        table.string('extract', 1000).nullable().defaultTo(null)
        table.string('thumbnail', 1000).nullable().defaultTo(null)
        table.integer('thumbnail_width').nullable().defaultTo(null)
        table.integer('thumbnail_height').nullable().defaultTo(null)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('filmes')
};