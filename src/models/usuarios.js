const mongoose = require('../database/index')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    senha: {
        type: String,
        required:true
    },
    nome: {
        type: String,
        required: true

    },
    nascimento:{
        type: String,
        required: true
    },
})
userSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 10)
    this.senha = hash
    next()
})
const Usuario = mongoose.model('Usuario', userSchema)

module.exports = Usuario