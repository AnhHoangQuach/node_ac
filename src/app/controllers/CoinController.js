const fetch = require('node-fetch')
const func = require('./functions')
const api_store_url = `http://login.acwallet.io/api/v1/agency-detail?name=${GLOBAL_AGENCYID}`
class CoinController {
    async index(req, res) {
        const fetch_store = await fetch(api_store_url)
        const data_store = await fetch_store.json()
        res.render('coins', {title: 'Đồng Coin', link: 'coins', agency: data_store.agency})
    }
}

module.exports = new CoinController