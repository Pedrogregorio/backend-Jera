const express = require('express')
const axios = require('axios')

const router = express.Router()
const middlewereAutenticate = require('../middlewares/auth')

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

router.post('/buscarFilmes', async (req, res) =>{
    try {
        const query = req.body.testo
        const page = 1
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