const siteRouter = require('./site')
const storeRouter = require('./store')
const transRouter = require('./transaction')
const coinRouter = require('./coins')
const walletRouter = require('./wallet')


function route(app) {
    app.use('/details', storeRouter)
    app.use('/transaction', transRouter)
    app.use('/coins', coinRouter)
    app.use('/wallet', walletRouter)

    app.use('/', siteRouter)

}

module.exports = route