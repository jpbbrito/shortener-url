import express from 'express'
import cors from 'cors'

import routes from './route.js'

const app = express()

app.use(cors())
app.use(express.json({ limit: '5120kb' }))
app.use('/', routes)

export default app