const mongoose = require('../database/index')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    id_dono: {
        type: String,
    },
    nome: {
        type: String,
        required: true
    },
})
const Perfil = mongoose.model('perfil', userSchema)

module.exports = Perfil