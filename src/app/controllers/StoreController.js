const fetch  = require('node-fetch')
const url  = require('url')
class StoreController {
    async index(req, res, next) {
        // const agencyName = req.query.name
        // const api_url = `http://login.acwallet.io/api/v1/agency-detail?name=${agencyName}`
        const api_url = `http://login.acwallet.io/api/v1/agency-detail?name=MA8888`
        const fetch_response = await fetch(api_url)
        const data = await fetch_response.json()
        var path_name = url.parse(api_url).query.split('name=')[1]
        var type, avatar
        if ( path_name.includes('SA')) {
            type = 'Super Admin'
            avatar = 'img/sa-icon.png'
        } else if (path_name.includes('MA')) {
            type = 'Master Agent'
            avatar = 'img/ma-icon.png'
        } else if (path_name.includes('AG')) {
            type = 'Agent'
            avatar = 'img/ag-icon.png'
        } else {
            type = ''
        }
        res.render('store', {
            title: 'Chi tiết đại lý',
            link: 'details',
            agency: data.agency,
            wallet: data.wallets,
            type: type,
            avatar: avatar,
        })
    }
}

module.exports = new StoreController