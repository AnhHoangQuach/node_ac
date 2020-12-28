class CoinController {
    index(req, res) {
        res.render('coins', {title: 'Đồng Coin', link: 'coins'})
    }
}

module.exports = new CoinController