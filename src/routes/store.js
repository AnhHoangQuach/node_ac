const express = require('express')
const router = express.Router()
const storeController = require('../app/controllers/StoreController')

router.use('/', storeController.index)


module.exports = router