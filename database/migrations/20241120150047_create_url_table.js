/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    const exists = await knex.schema.hasTable('urls')
    if (!exists) {
        return knex.schema.createTable('urls', (table) => {
            table.uuid('id').primary()
            table.string('short_id', 255).unique().notNullable()
            table.string('url_destination', 255).notNullable()
            table.integer('count_clicks')
            table.string('status', 255).notNullable()
            table.json('status_history')
            table.uuid('user_id').nullable()
            table.foreign('user_id').references('id').inTable('users')
            table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
            table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable()
        })
    }
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTableIfExists('users')
}