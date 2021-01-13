const fetch = require('node-fetch')
const api_url = `https://login.acwallet.io/api/v1/rates`
const api_store_url = `http://login.acwallet.io/api/v1/agency-detail?name=MA8888`
var listBank = [
    { "code" :"970454", "name" : "Ngân hàng TMCP Bản Việt (VIETCAPITAL)"},
    { "code" :"970452", "name" : "Ngân hàng TMCP Kiên Long (KIENLONGBANK)"},
    { "code" :"970400", "name" : "Ngân hàng TMCP Sài Gòn Công Thương (SAIGONBANK)"},
    { "code" :"970430", "name" : "Ngân hàng TMCP Xăng Dầu Petrolimex (PG BANK)"},
    { "code" :"970431", "name" : "Ngân hàng TMCP xuất nhập khẩu Việt Nam (EXIMBANK)"},
    { "code" :"970455", "name" : "Ngân hàng Công nghiệp Hàn Quốc (IBK)"},
    { "code" :"970421", "name" : "Ngân hàng Liên Doanh Việt Nga (VRB)"},
    { "code" :"970405", "name" : "Ngân hàng NN và PTNN Việt Nam (AGRIBANK)"},
    { "code" :"970408", "name" : "Ngân hàng TM TNHH MTV Dầu Khí Toàn Cầu (GPB)"},
    { "code" :"970416", "name" : "Ngân hàng TMCP Á Châu (ACB)"},
    { "code" :"970425", "name" : "Ngân hàng TMCP An Bình (ABBANK)"},
    { "code" :"970438", "name" : "Ngân hàng TMCP Bảo Việt (BVB)"},
    { "code" :"970449", "name" : "Ngân hàng TMCP Bưu Điện Liên Việt (LPB)"},
    { "code" :"970415", "name" : "Ngân hàng TMCP Công Thương Việt Nam (VIETINBANK)"},
    { "code" :"970412", "name" : "Ngân hàng TMCP Đại Chúng Việt Nam (PVCOMBANK)"},
    { "code" :"970414", "name" : "Ngân hàng TMCP Đại Dương (OCEANBANK)"},
    { "code" :"970418", "name" : "Ngân hàng TMCP Đầu tư và Phát triển Việt Nam (BIDV)"},
    { "code" :"970406", "name" : "Ngân hàng TMCP Đông Á (DONGABANK)"},
    { "code" :"970440", "name" : "Ngân hàng TMCP Đông Nam Á (SEABANK)"},
    { "code" :"970426", "name" : "Ngân hàng TMCP Hàng Hải Việt Nam (MSB)"},
    { "code" :"970407", "name" : "Ngân hàng TMCP Kỹ thương Việt Nam (TECHCOMBANK)"},
    { "code" :"970428", "name" : "Ngân hàng TMCP Nam Á (NAMABANK)"},
    { "code" :"970436", "name" : "Ngân hàng TMCP Ngoại Thương Việt Nam (VIETCOMBANK)"},
    { "code" :"970437", "name" : "Ngân hàng TMCP Phát Triển Thành Phố Hồ Chí Minh (HDB)"},
    { "code" :"970448", "name" : "Ngân hàng TMCP Phương Đông (OCB)"},
    { "code" :"970422", "name" : "Ngân hàng TMCP Quân Đội (MB)"},
    { "code" :"970419", "name" : "Ngân hàng TMCP Quốc Dân (NCB)"},
    { "code" :"970441", "name" : "Ngân hàng TMCP Quốc Tế (VIB)"},
    { "code" :"970429", "name" : "Ngân hàng TMCP Sài Gòn (SCB)"},
    { "code" :"970443", "name" : "Ngân hàng TMCP Sài Gòn - Hà Nội (SHB)"},
    { "code" :"970403", "name" : "Ngân hàng TMCP Sài Gòn Thương Tín (SACOMBANK)"},
    { "code" :"970423", "name" : "Ngân hàng TMCP Tiên Phong (TPBANK)"},
    { "code" :"970427", "name" : "Ngân hàng TMCP Việt Á (VAB)"},
    { "code" :"970432", "name" : "Ngân hàng TMCP Việt Nam Thịnh Vương (VPBANK)"},
    { "code" :"970433", "name" : "Ngân hàng TMCP Việt Nam Thương Tín (VIETBANK)"},
    { "code" :"970434", "name" : "Ngân hàng TNHH Indovina (INDOVINA)"},
    { "code" :"422589", "name" : "Ngân hàng TNHH MTV CIMB Việt Nam (CIMB)"},
    { "code" :"970442", "name" : "Ngân hàng TNHH MTV Hongleong Việt Nam (HONGLEONG)"},
    { "code" :"970439", "name" : "Ngân hàng TNHH MTV Public Việt Nam (PBVN)"},
    { "code" :"970424", "name" : "Ngân hàng TNHH MTV Shinhan Việt Nam (SHBVN)"},
    { "code" :"970458", "name" : "Ngân hàng TNHH MTV United Overseas Bank (UOB)"},
    
    { "code" :"970457", "name" : "Ngân hàng Wooribank (WOORIBANK)"}
];
class TransactionController {
    async index(req, res, next) {
        const fetch_response = await fetch(api_url)
        const data = await fetch_response.json()

        const fetch_store = await fetch(api_store_url)
        const data_store = await fetch_store.json()    
        var avatar
        if(data_store.agency.avatar == undefined) {
            if(data_store.agency.name.includes('SA')) {
                avatar = 'img/sa-icon.png'
            } else if(data_store.agency.name.includes('MA')) {
                avatar = 'img/ma-icon.png'
            } else if(data_store.agency.name.includes('AG')) {
                avatar = 'img/ag-icon.png'
            }
        }

        res.render('transaction', {
            title: 'Giao dịch',
            link: 'transaction',
            rates: data.rates,
            agency: data_store.agency,
            avatar: avatar,
        })
    }

    async buy(req, res, next) {
        const fetch_store = await fetch(api_store_url)
        const data_store = await fetch_store.json()

        const fetch_response = await fetch(api_url)
        const data = await fetch_response.json()
        const coin = req.query.coin;
        if (req.query.step == 2) {
            res.render('buy/buy2', { 
                title: 'Mua bước 2', 
                link: 'buy2' , 
                agency: data_store.agency, 
                listBank: listBank, 
                coin: coin.toUpperCase(),              
                rate : data.rates['ask_'+coin.toLowerCase()]               
            })
        } else if (req.query.step == 3) {
            res.render('buy/buy3', { 
                title: 'Mua bước 3', 
                link: 'buy3' , 
                agency: data_store.agency, 
                listBank: listBank, 
                coin: coin.toUpperCase(),
                rate : data.rates['ask_'+coin.toLowerCase()],                
            })
        } else if (req.query.step == 1) {
            res.render('buy/buy1', { 
                title: 'Mua bước 1', 
                link: 'buy1' , 
                agency: data_store.agency, 
                coin: coin.toUpperCase()                
            })
        } else if (req.query.step == 4) {
            res.render('buy/buy4', { 
                title: 'Mua bước 4', 
                link: 'buy4' , 
                agency: data_store.agency, 
                coin: coin.toUpperCase(),
                rate : data.rates['ask_'+coin.toLowerCase()],          
                listBank: listBank,   
            })
        }

        next();
    }
    
    async sell(req, res, next) {
        const fetch_store = await fetch(api_store_url)
        const data_store = await fetch_store.json()

        const fetch_response = await fetch(api_url)
        const data = await fetch_response.json()
        if (req.query.step == 2) {
            res.render('sell/sell2', { 
                title: 'Bán bước 2', 
                link: 'sell2', 
                agency: data_store.agency, 
                listBank: listBank , 
                coin: req.query.coin,
                rates: data.rates,
            })
        } else if (req.query.step == 3) {
            res.render('sell/sell3', { 
                title: 'Bán bước 3', 
                link: 'sell3', 
                agency: data_store.agency, 
                listBank: listBank,
                rates: data.rates,
            })
        } else if (req.query.step == 1) {
            res.render('sell/sell1', { 
                title: 'Bán bước 1', 
                link: 'sell1', agency: 
                data_store.agency, coin: 
                req.query.coin,
                rates: data.rates,
            })
        } else if (req.query.step == 4) {
            res.render('sell/sell4', { 
                title: 'Bán bước 4', 
                link: 'sell4', 
                agency: data_store.agency, 
                coin: req.query.coin,
                rates: data.rates,
                listBank: listBank,
            })
        }

        next();
    }
}

module.exports = new TransactionController