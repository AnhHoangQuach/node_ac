const fetch = require('node-fetch')
const api_store_url = `http://login.acwallet.io/api/v1/agency-detail?name=MA8888`
class SearchController {
    async index(req, res) {
        const fetch_store = await fetch(api_store_url)
        const data_store = await fetch_store.json()
        res.render('search', {title: 'Tra cứu đơn hàng', link: 'search', agency: data_store.agency})
    }
}

module.exports = new SearchController