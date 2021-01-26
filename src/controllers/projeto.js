const express = require('express')
const router = express.Router()
const middlewereAutenticate = require('../middlewares/auth')

router.use(middlewereAutenticate)
router.get('/', (req, res) => {
    res.send({ ok:true })
})

module.exports = app => app.use('/page', router)