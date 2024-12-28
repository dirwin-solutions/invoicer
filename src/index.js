const express = require('express')
const PORT = 4971
app = express()

app.get('/', async (req, res) => {
  res.send('hi')
})

app.listen(PORT)
console.log(`App active on http://localhost:${PORT}`)
