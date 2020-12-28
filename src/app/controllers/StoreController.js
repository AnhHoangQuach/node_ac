class StoreController {
    index(req, res) {
        res.render('store', {title: 'Chi tiết đại lý', link: 'details'})
    }
}

module.exports = new StoreController