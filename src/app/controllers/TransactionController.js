class TransactionController {
    index(req, res) {
        res.render('transaction', {title: 'Giao dịch', link: 'transaction'})
    }
}

module.exports = new TransactionController