//importando a biblioteca do mongoose
const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true)

//estabelecendo a conexao
// mongoose.connect('mongodb+srv://jera:desafiojera@cluster0.uixui.mongodb.net/desafio_jera?retryWrites=true&w=majority')
mongoose.connect('mongodb://localhost/jera')



mongoose.Promise = global.Promise

module.exports = mongoose