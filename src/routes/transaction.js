const express = require('express')
const router = express.Router()
const transactionController = require('../app/controllers/TransactionController')

router.use('/', transactionController.index)


module.exports = router