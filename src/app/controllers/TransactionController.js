class TransactionController {
    index(req, res) {
        if(req.query.step === 2) {
            res.render('buy2', {title: 'Mua bước 2', link: 'buy2'})
        } else if (req.query.step === 3) {
            res.render('buy3', {title: 'Mua bước 3', link: 'buy3'})
        } else {
            res.render('buy1', {title: 'Mua bước 1', link: 'buy1'})
        }
    }


}

module.exports = new TransactionController