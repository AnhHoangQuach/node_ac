const fetch = require('node-fetch')
const func = require('./functions')
const api_url = `https://login.acwallet.io/api/v1/rates`
const api_store_url = `http://login.acwallet.io/api/v1/agency-detail?name=${GLOBAL_AGENCYID}`
class TransactionController {
    async index(req, res, next) {
        const fetch_response = await fetch(api_url)
        const data = await fetch_response.json()

        const fetch_store = await fetch(api_store_url)
        const data_store = await fetch_store.json()
        var agency_info = func.getTypeAgency(api_store_url)

        res.render('transaction', {
            title: 'Giao dịch',
            link: 'transaction',
            rates: data.rates,
            agency: data_store.agency,
            avatar: agency_info.avatar,
        })
    }

    async buy(req, res, next) {
        const fetch_store = await fetch(api_store_url)
        const data_store = await fetch_store.json()

        const fetch_response = await fetch(api_url)
        const data = await fetch_response.json()
        const coin = req.query.coin;

        if (req.query.step == 1) {
            res.render('buy/buy1', {
                title: 'Mua bước 1',
                link: 'buy1',
                agency: data_store.agency,
            })
        } else if (req.query.step == 2) {
            res.render('buy/buy2', {
                title: 'Mua bước 2',
                link: 'buy2',
                agency: data_store.agency,
                coin: coin.toUpperCase(),
                rate: data.rates['ask_' + coin.toLowerCase()],
            })
        } else if (req.query.step == 3) {
            res.render('buy/buy3', {
                title: 'Mua bước 3',
                link: 'buy3',
                agency: data_store.agency,
                listBank: func.listBank,
                coin: coin.toUpperCase(),
                rate: data.rates['ask_' + coin.toLowerCase()],
            })
        } else if (req.query.step == 4) {
            res.render('buy/buy4', {
                title: 'Mua bước 4',
                link: 'buy4',
                agency: data_store.agency,
                coin: coin.toUpperCase(),
                rate: data.rates['ask_' + coin.toLowerCase()],
                listBank: func.listBank,
            })
        } else if (req.query.step == 4) {
            res.render('buy/buy4', { 
                title: 'Mua bước 4', 
                link: 'buy4' ,
                agency: data_store.agency, 
                coin: coin.toUpperCase(),
                rate: data.rates['ask_' + coin.toLowerCase()],
                listBank: func.listBank,
            })
        } else if (req.query.step == 5) {
            res.render('buy/buy5', { 
                title: 'Mua bước 5', 
                link: 'buy5' , 
                agency: data_store.agency, 
                coin: coin.toUpperCase(),
                rate : data.rates['ask_'+coin.toLowerCase()],          
                listBank: func.listBank,
                typeMethod: 2,
            })
        }

        next();
    }

    async sell(req, res, next) {
        const fetch_store = await fetch(api_store_url)
        const data_store = await fetch_store.json()

        const fetch_response = await fetch(api_url)
        const data = await fetch_response.json()

        const coin = req.query.coin;
        if (req.query.step == 1) {
            res.render('sell/sell1', {
                title: 'Bán bước 1',
                link: 'sell1', agency:
                    data_store.agency,
            })
        } else if (req.query.step == 2) {
            res.render('sell/sell2', {
                title: 'Bán bước 2',
                link: 'sell2',
                agency: data_store.agency,
                listBank: func.listBank,
                coin: coin.toUpperCase(),
                rate: data.rates['bid_' + coin.toLowerCase()],
            })
        } else if (req.query.step == 3) {
            res.render('sell/sell3', {
                title: 'Bán bước 3',
                link: 'sell3',
                agency: data_store.agency,
                listBank: func.listBank,
                coin: coin.toUpperCase(),
                rate: data.rates['bid_' + coin.toLowerCase()],
            })
        } else if (req.query.step == 4) {
            res.render('sell/sell4', {
                title: 'Bán bước 4',
                link: 'sell4',
                agency: data_store.agency,
                listBank: func.listBank,
                coin: coin.toUpperCase(),
                rate: data.rates['bid_' + coin.toLowerCase()],
            })
        }else if (req.query.step == 5) {
            res.render('sell/sell5', {
                title: 'Bán bước 5',
                link: 'sell5',
                agency: data_store.agency,
                listBank: func.listBank,
                coin: coin.toUpperCase(),
                rate: data.rates['bid_' + coin.toLowerCase()],
                typeMethod: 1,
            })
        }

        next();
    }
}

module.exports = new TransactionController