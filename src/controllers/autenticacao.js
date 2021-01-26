const express = require('express')
const Usuario = require('../models/usuarios')

const router = express.Router()

router.post('/registro', async (req, res)=>{
    const { email } = req.body
    try {
        if(await Usuario.findOne({ email })){
            res.status(400).send({ erro: 'Esse Email já esta sendo usado' })
        }
        const user = await Usuario.create(req.body)
        user.senha = undefined;
        return res.send({ user })
    } catch (error) {
        res.status(400).send({ erro: 'falha no cadastro' })
    }
})

module.exports = app => app.use('/cadastro', router)