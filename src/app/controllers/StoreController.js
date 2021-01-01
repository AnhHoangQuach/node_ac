const fetch  = require('node-fetch')    
class StoreController {
    async index(req, res, next) {
        // const agencyName = req.query.name
        // const api_url = `http://login.acwallet.io/api/v1/agency-detail?name=${agencyName}`
        const api_url = `http://login.acwallet.io/api/v1/agency-detail?name=SA88`
        const fetch_response = await fetch(api_url)
        const data = await fetch_response.json()
        res.render('store', {
            title: 'Chi tiết đại lý',
            link: 'details',
            agency: data.agency,
            wallet: data.wallets,
        })
    }
}

module.exports = new StoreController