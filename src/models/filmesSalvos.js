const mongoose = require('../database/index')

const filmesSchema = new mongoose.Schema({
    perfil:{
        type:String
    },
    filmes: {
        type: String
    }
})

const Filmes = mongoose.model('filmes', filmesSchema)

module.exports = Filmes