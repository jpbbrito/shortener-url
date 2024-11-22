/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    const exists = await knex.schema.hasTable('users')
    if (!exists) {
        return knex.schema.createTable('users', (table) => {
            table.uuid('id').primary()
            table.string('email', 255).unique().notNullable()
            table.string('name', 255).unique().notNullable()
            table.string('password', 255).notNullable()
            table.string('status', 255).notNullable()
            table.json('status_history')
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