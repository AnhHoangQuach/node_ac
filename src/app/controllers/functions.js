const e = require("express");
const url = require('url')
const fetch  = require('node-fetch')
var listBank = [
    { "code": "970454", "name": "Ngân hàng TMCP Bản Việt (VIETCAPITAL)" },
    { "code": "970452", "name": "Ngân hàng TMCP Kiên Long (KIENLONGBANK)" },
    { "code": "970400", "name": "Ngân hàng TMCP Sài Gòn Công Thương (SAIGONBANK)" },
    { "code": "970430", "name": "Ngân hàng TMCP Xăng Dầu Petrolimex (PG BANK)" },
    { "code": "970431", "name": "Ngân hàng TMCP xuất nhập khẩu Việt Nam (EXIMBANK)" },
    { "code": "970455", "name": "Ngân hàng Công nghiệp Hàn Quốc (IBK)" },
    { "code": "970421", "name": "Ngân hàng Liên Doanh Việt Nga (VRB)" },
    { "code": "970405", "name": "Ngân hàng NN và PTNN Việt Nam (AGRIBANK)" },
    { "code": "970408", "name": "Ngân hàng TM TNHH MTV Dầu Khí Toàn Cầu (GPB)" },
    { "code": "970416", "name": "Ngân hàng TMCP Á Châu (ACB)" },
    { "code": "970425", "name": "Ngân hàng TMCP An Bình (ABBANK)" },
    { "code": "970438", "name": "Ngân hàng TMCP Bảo Việt (BVB)" },
    { "code": "970449", "name": "Ngân hàng TMCP Bưu Điện Liên Việt (LPB)" },
    { "code": "970415", "name": "Ngân hàng TMCP Công Thương Việt Nam (VIETINBANK)" },
    { "code": "970412", "name": "Ngân hàng TMCP Đại Chúng Việt Nam (PVCOMBANK)" },
    { "code": "970414", "name": "Ngân hàng TMCP Đại Dương (OCEANBANK)" },
    { "code": "970418", "name": "Ngân hàng TMCP Đầu tư và Phát triển Việt Nam (BIDV)" },
    { "code": "970406", "name": "Ngân hàng TMCP Đông Á (DONGABANK)" },
    { "code": "970440", "name": "Ngân hàng TMCP Đông Nam Á (SEABANK)" },
    { "code": "970426", "name": "Ngân hàng TMCP Hàng Hải Việt Nam (MSB)" },
    { "code": "970407", "name": "Ngân hàng TMCP Kỹ thương Việt Nam (TECHCOMBANK)" },
    { "code": "970428", "name": "Ngân hàng TMCP Nam Á (NAMABANK)" },
    { "code": "970436", "name": "Ngân hàng TMCP Ngoại Thương Việt Nam (VIETCOMBANK)" },
    { "code": "970437", "name": "Ngân hàng TMCP Phát Triển Thành Phố Hồ Chí Minh (HDB)" },
    { "code": "970448", "name": "Ngân hàng TMCP Phương Đông (OCB)" },
    { "code": "970422", "name": "Ngân hàng TMCP Quân Đội (MB)" },
    { "code": "970419", "name": "Ngân hàng TMCP Quốc Dân (NCB)" },
    { "code": "970441", "name": "Ngân hàng TMCP Quốc Tế (VIB)" },
    { "code": "970429", "name": "Ngân hàng TMCP Sài Gòn (SCB)" },
    { "code": "970443", "name": "Ngân hàng TMCP Sài Gòn - Hà Nội (SHB)" },
    { "code": "970403", "name": "Ngân hàng TMCP Sài Gòn Thương Tín (SACOMBANK)" },
    { "code": "970423", "name": "Ngân hàng TMCP Tiên Phong (TPBANK)" },
    { "code": "970427", "name": "Ngân hàng TMCP Việt Á (VAB)" },
    { "code": "970432", "name": "Ngân hàng TMCP Việt Nam Thịnh Vương (VPBANK)" },
    { "code": "970433", "name": "Ngân hàng TMCP Việt Nam Thương Tín (VIETBANK)" },
    { "code": "970434", "name": "Ngân hàng TNHH Indovina (INDOVINA)" },
    { "code": "422589", "name": "Ngân hàng TNHH MTV CIMB Việt Nam (CIMB)" },
    { "code": "970442", "name": "Ngân hàng TNHH MTV Hongleong Việt Nam (HONGLEONG)" },
    { "code": "970439", "name": "Ngân hàng TNHH MTV Public Việt Nam (PBVN)" },
    { "code": "970424", "name": "Ngân hàng TNHH MTV Shinhan Việt Nam (SHBVN)" },
    { "code": "970458", "name": "Ngân hàng TNHH MTV United Overseas Bank (UOB)" },
    { "code": "970457", "name": "Ngân hàng Wooribank (WOORIBANK)" }
];

var listCoin = {
    btc: 1,
    eth: 3,
    bch: 4,
    ltc: 5,
    usdt: 6,
    xrp: 8,
    xlm: 10,
    trx: 11,
    vndt: 12,
    usdf: 14,
}

function checkZero(data) {
    if (data.length == 1) {
        data = "0" + data;
    }
    return data;
}

module.exports = {
    getBankName: function (code) {
        var name = "";
        for (let i = 0; i < listBank.length; i++) {
            var element = listBank[i];         
            if (element.code == code) {
                name = element.name;            
                break;         
            }
        }      
        return name;
    },
    getStatusText: function (code) {
        if (code == 1) {
            return "success";
        } else if (code == 2) {
            return "pending";
        } else if (code == 3) {
            return "proccessing";
        } else {
            return "error";
        }
    },
    getcurrencyName: function (code) {
        for (var key in listCoin) {
            if (listCoin[key] == code) {
                return key.toUpperCase();
            }
        }
        return "";
    },
    getType: function (code) {
        if (code == 1) {
            return "Bán";
        } else return "Mua";
    },
    formatDateTime: function (time) {
        var today = new Date(time);
        var day = today.getDate() + "";
        var month = (today.getMonth() + 1) + "";
        var year = today.getFullYear() + "";
        var hour = today.getHours() + "";
        var minutes = today.getMinutes() + "";
        var seconds = today.getSeconds() + "";

        day = checkZero(day);
        month = checkZero(month);
        year = checkZero(year);
        hour = checkZero(hour);
        minutes = checkZero(minutes);
        seconds = checkZero(seconds);

        var result = (day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds);
        return result;
    },
    getTypeAgency: function(api_store_url) {
        var path_name = url.parse(api_store_url).query.split('name=')[1]
        var type, avatar
        if ( path_name.includes('SA')) {
            type = 'Super Admin'
            avatar = 'img/sa-icon.png'
        } else if (path_name.includes('MA')) {
            type = 'Master Agent'
            avatar = 'img/ma-icon.png'
        } else if (path_name.includes('AG')) {
            type = 'Agent'
            avatar = 'img/ag-icon.png'
        } else {
            type = ''
        }
        var agency_info = {
            type: type,
            avatar: avatar,
        }
        return agency_info
    },
    getVerification: function(agency) {
        if(agency.verification === "nonVerify") {
            return 'Chưa xác minh';
        } else {
            return 'Đã xác minh'
        }
    },
    formatNumber: function(number) {
        return Intl.NumberFormat().format(number);
    },
    getBalance: function(address) {
        fetch(`https://api.trongrid.io/v1/accounts/${address}`, {
            method: 'GET',
        })
        .then(response => {
            return response.json();
        }).then(data => {
            var assetV2 = data.data[0].assetV2;
            assetV2.forEach(element => {
                if (element.key == "1003496") {
                    var balance = element.value;
                    var value_return = Intl.NumberFormat().format(balance / 1000) + ' VNDT'
                    return value_return;
                }
            });
            return;
        });
    }
};