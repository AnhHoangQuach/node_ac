const fetch  = require('node-fetch')
const url  = require('url')
class StoreController {
    async index(req, res, next) {
        // const agencyName = req.query.name
        // const api_url = `http://login.acwallet.io/api/v1/agency-detail?name=${agencyName}`
        const api_url = `http://login.acwallet.io/api/v1/agency-detail?name=SA88`
        const fetch_response = await fetch(api_url)
        const data = await fetch_response.json()
        var path_name = url.parse(api_url).query.split('name=')[1]
        var type
        if ( path_name.includes('SA')) {
            type = 'Super Admin'
        } else if (path_name.includes('MA')) {
            type = 'Master Agent'
        } else if (path_name.includes('AG')) {
            type = 'Agent'
        } else {
            type = ''
        }
        res.render('store', {
            title: 'Chi tiết đại lý',
            link: 'details',
            agency: data.agency,
            wallet: data.wallets,
            type: type,
        })
    }
}

module.exports = new StoreController