//importando as bibliotecas para gerenciamento do app
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()

//adcionando as funcionalidades do BodyParser ao nosso app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//referenciano os controllers

async function listaPopular(req,res) {
    try {
        const query = req.body.testo
        const page = 1
        const API_KEY = 'c03905120d6d5938545433512416b962'

        const BASE_URL = 'http://api.themoviedb.org/3'
        var nome = []
        //extraindo os dados da api
        const { data } = await axios('https://api.themoviedb.org/3/discover/movie?api_key=c03905120d6d5938545433512416b962&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
        for (let i = 0; i < data.results.length; i++) {
             nome[i] = data.results[i].original_title
            
        }
        console.log(nome)
        return res.json(data.results)   
    
    } catch (error) {
        console.log(error)
    }
    
}

// app.get('/', (req, res) => {
//     listaPopular(req, res)
// })

app.post('/movies/buscarFilmes', async (req, res) =>{
    try {
        const query = req.body.testo
        const page = 1
        const API_KEY = 'c03905120d6d5938545433512416b962'

        const BASE_URL = 'http://api.themoviedb.org/3'
        var nome = []
        //extraindo os dados da api
        const { data } = await axios(BASE_URL+'/search/movie?api_key='+ API_KEY +'&query='+query+'&page='+page)
        for (let i = 0; i < data.results.length; i++) {
             nome[i] = data.results[i].original_title
            
        }
        console.log(nome)
        return res.json(data)   
    
    } catch (error) {
        console.log(error)
    }
    
})
require('./controllers/autenticacao')(app)
require('./controllers/projeto')(app)

//colocando o app para rodar na porta 3000
app.listen(3000)