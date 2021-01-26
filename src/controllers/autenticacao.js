const express = require('express')
const Usuario = require('../models/usuarios')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/auth')

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

router.post('/autenticacao', async (req, res)=>{
    const { email, senha } = req.body

    const user = await Usuario.findOne({ email }).select('+senha')
    if(!user){
        return res.status(400).send({ erro: 'Usuario nao encontrado' })
    }
    if(!await bcrypt.compare(senha, user.senha)){
        return res.status(400).send({ erro: 'Senha incorreta' })
    }
    user.senha = undefined
    const token = jwt.sign({ id: user._id }, config.secret, {expiresIn: 86400})
    res.send({ user, token })
})

module.exports = app => app.use('/cadastro', router)