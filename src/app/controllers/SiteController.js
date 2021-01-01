class SiteController {
    index(req, res) {
        res.render('home', { title: 'Trang chủ', link: 'home' })
    }

    showContact(req, res) {
        res.render('contact', { title: 'Liên hệ', link: 'contact' })
    }
}

module.exports = new SiteController