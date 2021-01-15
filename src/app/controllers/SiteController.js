const fetch = require('node-fetch')
const api_url = `https://login.acwallet.io/api/v1/rates`
const api_store_url = `https://login.acwallet.io/api/v1/agency-detail?name=MA8888`
var func = require("./functions.js");
class SiteController {
    async index(req, res, next) {
        const fetch_response = await fetch(api_url)
        const data = await fetch_response.json()

        const fetch_store = await fetch(api_store_url)
        const data_store = await fetch_store.json()
        
        var agency_info = func.getTypeAgency(api_store_url)

        var verification = func.getVerification(data_store)
        var guaranteeAmount = func.formatNumber(data_store.agency.guaranteeAmount)

        res.render('home', {
            title: 'Trang chủ',
            link: 'home',
            rates: data.rates,
            agency: data_store.agency,
            type: agency_info.type,
            avatar: agency_info.avatar,
            verification: verification,
            guaranteeAmount: guaranteeAmount
        })
    }

    async showContact(req, res) {
        const fetch_store = await fetch(api_store_url)
        const data_store = await fetch_store.json()

        var agency_info = func.getTypeAgency(api_store_url)

        res.render('contact', { title: 'Liên hệ', link: 'contact' , agency: data_store.agency, avatar: agency_info.avatar})
    }
}

module.exports = new SiteController