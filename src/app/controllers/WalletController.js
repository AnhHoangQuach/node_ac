class WalletController {
    index(req, res) {
        res.render('wallet', {title: 'ACWallet.io', link: 'wallet'})
    }
}

module.exports = new WalletController