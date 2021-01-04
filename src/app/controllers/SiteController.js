const fetch = require('node-fetch')
const url = require('url')
const api_url = `https://login.acwallet.io/api/v1/rates`
const api_store_url = `http://login.acwallet.io/api/v1/agency-detail?name=SA88`
class SiteController {
    async index(req, res, next) {
        const fetch_response = await fetch(api_url)
        const data = await fetch_response.json()

        const fetch_store = await fetch(api_store_url)
        const data_store = await fetch_store.json()
        var path_name = url.parse(api_store_url).query.split('name=')[1]
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
        
        res.render('home', {
            title: 'Trang chủ',
            link: 'home',
            rates: data.rates,
            agency: data_store.agency,
            type: type,
        })
    }

    async showContact(req, res) {
        const fetch_store = await fetch(api_store_url)
        const data_store = await fetch_store.json()
        res.render('contact', { title: 'Liên hệ', link: 'contact' , agency: data_store.agency})
    }
}

module.exports = new SiteController