const fetch  = require('node-fetch')
var func = require("./functions.js");
class StoreController {
    async index(req, res, next) {
        // const agencyName = req.query.name
        // const api_url = `http://login.acwallet.io/api/v1/agency-detail?name=${agencyName}`
        const api_store_url = `http://login.acwallet.io/api/v1/agency-detail?name=MA6666`
        const fetch_response = await fetch(api_store_url)
        const data = await fetch_response.json()
        
        var agency_info = func.getTypeAgency(api_store_url)
        var verification = func.getVerification(data)

        var balance = await func.getBalance(data.agency.address)

        res.render('store', {
            title: 'Chi tiết đại lý',
            link: 'details',
            agency: data.agency,
            wallet: data.wallets,
            type: agency_info.type,
            avatar: agency_info.avatar,
            verification: verification,
            balance: balance,
        })
    }
}

module.exports = new StoreController