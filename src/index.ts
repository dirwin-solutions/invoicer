import express from 'express'
import apiRouter from './router'

const PORT = process.env.PORT || 4971
const app = express()

app.use(express.json())
app.use('/api', apiRouter)

app.listen(PORT)
console.log(`App active on http://localhost:${PORT}`)
