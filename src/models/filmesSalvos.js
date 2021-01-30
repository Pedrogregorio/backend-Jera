const mongoose = require('../database/index')

const filmesSchema = new mongoose.Schema({
    perfil:{
        type:String
    },
    filmes: {
        type: String
    },
    assistido:{
        type:Boolean
    }
})

const Filmes = mongoose.model('filmes', filmesSchema)

module.exports = Filmes