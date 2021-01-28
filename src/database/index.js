//importando a biblioteca do mongoose
const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true)

//estabelecendo a conexao
mongoose.connect(process.env.MONGO_URL)



mongoose.Promise = global.Promise

module.exports = mongoose