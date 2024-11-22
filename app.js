import knex from 'knex'
import app from './src/server.js'
import configuration from './knexfile.js'
import Database from './src/services/database.js'

async function start() {
    await Database.createConnection(knex, configuration[process.env.NODE_ENV])
    app.listen(process.env.API_PORT, () => {
        console.log(`Server running on PORT ${process.env.API_PORT}`)
    })
}

start()