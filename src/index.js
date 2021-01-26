//importando as bibliotecas para gerenciamento do app
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

//adcionando as funcionalidades do BodyParser ao nosso app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//referenciano os controllers
require('./controllers/autenticacao')(app)

//colocando o app para rodar na porta 3000
app.listen(3000)