const express = require('express')
const axios = require('axios')
const Usuario = require('../models/usuarios')
const Filmes = require('../models/filmesSalvos')
const router = express.Router()
const middlewereAutenticate = require('../middlewares/auth')
const { isValidObjectId } = require('mongoose')

router.use(middlewereAutenticate)

router.get('/inicio', async (req, res) => {
    try {
        const API_KEY = 'c03905120d6d5938545433512416b962'
        const BASE_URL = 'https://api.themoviedb.org/3/'
        //extraindo os dados da api
        const { data } = await axios(BASE_URL+'discover/movie?api_key='+API_KEY+'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
        return res.json(data)   
    } catch (error) {
        console.log(error)
    }
})

router.post('/salvando', async (req, res)=>{
    const filme = String(req.body.filmes)
    const perfil = req.userId
    
    const query = {perfil: perfil, filmes: filme}

    try {
        if(await Filmes.findOne(query)){
            return res.json({ erro: 'O filme ja foi adcionado' })
        }
        const resposta = await Filmes.create(query)
        return res.json(resposta)
    } catch (error) {
        console.log(error)
    }
    
})

router.get('/lista', async (req, res) =>{
    try {
        let filmes = []
        const id = req.userId
        const API_KEY = 'c03905120d6d5938545433512416b962'
        const resposta = await Filmes.find({perfil: id})

        for (let i = 0; i < resposta.length; i++) {
            const { data } = await axios("https://api.themoviedb.org/3/movie/"+ resposta[i].filmes +"?api_key="+API_KEY)   
            filmes[i] = data
        }
        return res.json(filmes)
    } catch (error) {
        return res.json({erro: error})
    }
})

router.get('/perfil', async (req, res) =>{
    try {
        const id = req.userId
        const resposta = await Usuario.findById(id)
        return res.json(resposta)
    } catch (error) {
        res.status(400).json({ erro: 'Usuario Nao encontrado' })
    }
    
})

router.post('/buscarFilmes', async (req, res) =>{
    try {
        const query = req.body.pesquisa
        const page = req.body.pagina
        const API_KEY = 'c03905120d6d5938545433512416b962'
        const BASE_URL = 'http://api.themoviedb.org/3'

        //extraindo os dados da api
        const { data } = await axios(BASE_URL+'/search/movie?api_key='+ API_KEY +'&query='+query+'&page='+page)
        return res.json(data.results)   

    } catch (error) {
        console.log(error)
    }
    
})

module.exports = app => app.use('/page', router)