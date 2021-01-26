const jwt = require('jsonwebtoken')
const config = require('../config/auth.json')
module.exports = (req, res, next) =>{
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).send({ erro:'token nao informado ' })
    }

    const parts = authHeader.split(' ')

    if(!parts.length === 2){
        return res.status(401).send({ erro:'Erro com o token' })
    }

    const [schema, token] = parts

    if(!/^Bearer$/i.test(schema)){
        return res.status(401).send({erro:'token mal formatado'})
    }

    jwt.verify(token, config.secret, (err, decoded)=>{
        if(err){
            return res.status(401).send({erro: 'Token invalido'})
        }
        req.userId = decoded._id
        return next()
    })
}