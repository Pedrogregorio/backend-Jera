const express = require('express')
const axios = require('axios')
const Usuario = require('../models/usuarios')
const Filmes = require('../models/filmesSalvos')
const Perfil = require('../models/perfil')

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

router.post('/salvando', async (req, res)=>{
    const filme = String(req.body.filmes)
    const perfil = String(req.body.perfil)
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

router.put('/assistido', async (req, res)=>{
    const filme = String(req.body.filmes)
    const perfil = String(req.body.perfil)
    const query = {perfil: perfil, filmes: filme, assistido: true}
    try {
        if(await Filmes.findOne(query)){
            return res.json({ erro: 'O filme ja foi assitido' })
        }
        const resposta = await Filmes.updateOne({perfil:perfil, filmes:filme}, query)
        
        return res.json({resposta:resposta, status: 'atualizado'})
    } catch (error) {
        return res.json({erro: 'Nao foi possivel Adicionar á lista'})
    }
})

router.post('/cria_perfil', async (req, res) => {
    try {
        const nome = req.body.nome
        const id_dono = req.userId
        if((await Perfil.find({id_dono: id_dono})).length >=4){
            return res.json({erro:'Numero maximo de Perfis exedido'})
        }
        const query = {id_dono: id_dono, nome:nome}
        const resposta = await Perfil.create(query)
        return res.json(resposta)
    } catch (error) {
        return res.json({erro: 'Nao foi possivel cadastrar esse perfil'})
    }
})

router.delete('/deletePerfil', async (req, res)=>{
    try {
        const id = req.body.id
        const teste = await Filmes.deleteMany({perfil: String(id)})
        const resposta = await Perfil.deleteOne({id_dono: req.userId, _id: id})
        return res.json({respostar:resposta, teste:teste, status: 'ok'})
    } catch (error) {
        return {erro: 'Nao foi possivel deletar'}
    }
})

router.post('/lista', async (req, res) =>{
    try {
        const perfil = req.body.perfil
        let filmes = []
        const API_KEY = 'c03905120d6d5938545433512416b962'
        const resposta = await Filmes.find({perfil: perfil})
        for (let i = 0; i < resposta.length; i++) {
            const { data } = await axios("https://api.themoviedb.org/3/movie/"+ resposta[i].filmes +"?api_key="+API_KEY)   
            if(resposta[i].assistido == true){
                data.assistido = true
            }
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
        const resposta = await Perfil.find({id_dono: id})
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