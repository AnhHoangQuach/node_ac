const fetch = require('node-fetch')
class SiteController {
    async index(req, res, next) {
        const api_url = `https://login.acwallet.io/api/v1/rates`
        const fetch_response = await fetch(api_url)
        const data = await fetch_response.json()
        res.render('home', {
            title: 'Trang chủ',
            link: 'home',
            rates: data.rates,
        })
    }

    showContact(req, res) {
        res.render('contact', { title: 'Liên hệ', link: 'contact' })
    }
}

module.exports = new SiteController