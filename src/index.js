const express = require('express')
app = express()

app.get('/', async (req, res) => {
  res.send('hi')
})

app.listen(3000)
console.log('App active on http://localhost:3000')
