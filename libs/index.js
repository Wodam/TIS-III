const express = require('express')
const fs = require('fs');
const app = express()
const port = 8000
require('./router/routes')(app)

app.listen(port, () => {
    console.log(`Listening at localhost:${port}`)
})