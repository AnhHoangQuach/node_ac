const express = require('express')
const router = express.Router()
const transactionController = require('../app/controllers/TransactionController')

router.use('/buy', transactionController.buy)

router.use('/sell', transactionController.sell)
router.post('/getAccount', transactionController.getAccount)

router.use('/', transactionController.index)


module.exports = router