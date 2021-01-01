const fetch = require('node-fetch')
class TransactionController {
    async index(req, res, next) {
        const api_url = `https://login.acwallet.io/api/v1/rates`
        const fetch_response = await fetch(api_url)
        const data = await fetch_response.json()
        res.render('transaction', {
            title: 'Giao dịch',
            link: 'transaction',
            rates: data.rates,
        })
    }

    buy(req, res, next) {
        if (req.query.step == 2) {
            res.render('buy/buy2', { title: 'Mua bước 2', link: 'buy2' })
        } else if (req.query.step == 3) {
            res.render('buy/buy3', { title: 'Mua bước 3', link: 'buy3' })
        } else if (req.query.step == 1) {
            res.render('buy/buy1', { title: 'Mua bước 1', link: 'buy1' })
        } else if (req.query.step == 4) {
            res.render('buy/buy4', { title: 'Mua bước 4', link: 'buy4' })
        }

        next();
    }

    sell(req, res, next) {
        if (req.query.step == 2) {
            res.render('sell/sell2', { title: 'Bán bước 2', link: 'sell2' })
        } else if (req.query.step == 3) {
            res.render('sell/sell3', { title: 'Bán bước 3', link: 'sell3' })
        } else if (req.query.step == 1) {
            res.render('sell/sell1', { title: 'Bán bước 1', link: 'sell1' })
        } else if (req.query.step == 4) {
            res.render('sell/sell4', { title: 'Bán bước 4', link: 'sell4' })
        }

        next();
    }
}

module.exports = new TransactionController