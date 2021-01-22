const fetch = require('node-fetch')
const api_store_url = `http://login.acwallet.io/api/v1/agency-detail?name=AG686868`

const api_get_order_info = 'https://login.acwallet.io/api/v1/order-details?id=';
var func = require("./functions.js");

class SearchController {
    async index(req, res) {

        const orderId = req.query.id;

        const fetch_store = await fetch(api_store_url);
        const data_store = await fetch_store.json();
        const fetch_order = await fetch(api_get_order_info + orderId);
        const data_order = await fetch_order.json();

        var order_exist = "";
        var error_desc = "";
        if (data_order.id == undefined) {
            order_exist = "d-none";
            error_desc = orderId != undefined ? data_order.description : "";
            data_order.id = orderId;
        } else {
            data_order.currency = func.getcurrencyName(data_order.currencyCode);
            data_order.statusText = func.getStatusText(data_order.status);
            data_order.statusClass = func.getStatusClass(data_order.status);
            data_order.type = func.getType(data_order.orderType);
            data_order.receiveBank.bank = func.getBankName(data_order.receiveBank.bankCode);
            data_order.createdText = func.formatDateTime(data_order.createdDate);
            data_order.contact = JSON.parse(data_order.contact);
        }

        res.render('search', {
            title: 'Tra cứu đơn hàng',
            link: 'search',
            agency: data_store.agency,
            order: data_order,
            order_exist: order_exist,
            error_desc: error_desc
        })
    }
}

module.exports = new SearchController


