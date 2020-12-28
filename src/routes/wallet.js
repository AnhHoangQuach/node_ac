const express = require('express')
const router = express.Router()
const walletController = require('../app/controllers/WalletController')

router.use('/', walletController.index)


module.exports = router