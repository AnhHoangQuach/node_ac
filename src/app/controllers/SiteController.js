const fetch = require('node-fetch')
const url = require('url')
const api_url = `https://login.acwallet.io/api/v1/rates`
const api_store_url = `https://login.acwallet.io/api/v1/agency-detail?name=MA8888`
class SiteController {
    async index(req, res, next) {
        const fetch_response = await fetch(api_url)
        const data = await fetch_response.json()

        const fetch_store = await fetch(api_store_url)
        const data_store = await fetch_store.json()
        var path_name = url.parse(api_store_url).query.split('name=')[1]
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
        
        res.render('home', {
            title: 'Trang chủ',
            link: 'home',
            rates: data.rates,
            agency: data_store.agency,
            type: type,
            avatar: avatar,
        })
    }

    async showContact(req, res) {
        const fetch_store = await fetch(api_store_url)
        const data_store = await fetch_store.json()

        var path_name = url.parse(api_store_url).query.split('name=')[1]
        var avatar
        if ( path_name.includes('SA')) {
            avatar = 'img/sa-icon.png'
        } else if (path_name.includes('MA')) {
            avatar = 'img/ma-icon.png'
        } else if (path_name.includes('AG')) {
            avatar = 'img/ag-icon.png'
        }
        res.render('contact', { title: 'Liên hệ', link: 'contact' , agency: data_store.agency, avatar: avatar})
    }
}

module.exports = new SiteController