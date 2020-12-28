const express = require('express')
const router = express.Router()
const coinController = require('../app/controllers/CoinController')

router.use('/', coinController.index)


module.exports = router