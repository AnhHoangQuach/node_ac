const e = require("express");
const url = require('url')
const fetch  = require('node-fetch')
var listBank = [
    { "code": "970454", "name": "NH TMCP Bản Việt (VIETCAPITAL)" },
    { "code": "970452", "name": "NH TMCP Kiên Long (KIENLONGBANK)" },
    { "code": "970400", "name": "NH TMCP Sài Gòn Công Thương (SAIGONBANK)" },
    { "code": "970430", "name": "NH TMCP Xăng Dầu Petrolimex (PG BANK)" },
    { "code": "970431", "name": "NH TMCP xuất nhập khẩu Việt Nam (EXIMBANK)" },
    { "code": "970455", "name": "NH Công nghiệp Hàn Quốc (IBK)" },
    { "code": "970421", "name": "NH Liên Doanh Việt Nga (VRB)" },
    { "code": "970405", "name": "NH NN và PTNN Việt Nam (AGRIBANK)" },
    { "code": "970408", "name": "NH TM TNHH MTV Dầu Khí Toàn Cầu (GPB)" },
    { "code": "970416", "name": "NH TMCP Á Châu (ACB)" },
    { "code": "970425", "name": "NH TMCP An Bình (ABBANK)" },
    { "code": "970438", "name": "NH TMCP Bảo Việt (BVB)" },
    { "code": "970449", "name": "NH TMCP Bưu Điện Liên Việt (LPB)" },
    { "code": "970415", "name": "NH TMCP Công Thương Việt Nam (VIETINBANK)" },
    { "code": "970412", "name": "NH TMCP Đại Chúng Việt Nam (PVCOMBANK)" },
    { "code": "970414", "name": "NH TMCP Đại Dương (OCEANBANK)" },
    { "code": "970418", "name": "NH TMCP Đầu tư và Phát triển Việt Nam (BIDV)" },
    { "code": "970406", "name": "NH TMCP Đông Á (DONGABANK)" },
    { "code": "970440", "name": "NH TMCP Đông Nam Á (SEABANK)" },
    { "code": "970426", "name": "NH TMCP Hàng Hải Việt Nam (MSB)" },
    { "code": "970407", "name": "NH TMCP Kỹ thương Việt Nam (TECHCOMBANK)" },
    { "code": "970428", "name": "NH TMCP Nam Á (NAMABANK)" },
    { "code": "970436", "name": "NH TMCP Ngoại Thương Việt Nam (VIETCOMBANK)" },
    { "code": "970437", "name": "NH TMCP Phát Triển TP Hồ Chí Minh (HDB)" },
    { "code": "970448", "name": "NH TMCP Phương Đông (OCB)" },
    { "code": "970422", "name": "NH TMCP Quân Đội (MB)" },
    { "code": "970419", "name": "NH TMCP Quốc Dân (NCB)" },
    { "code": "970441", "name": "NH TMCP Quốc Tế (VIB)" },
    { "code": "970429", "name": "NH TMCP Sài Gòn (SCB)" },
    { "code": "970443", "name": "NH TMCP Sài Gòn - Hà Nội (SHB)" },
    { "code": "970403", "name": "NH TMCP Sài Gòn Thương Tín (SACOMBANK)" },
    { "code": "970423", "name": "NH TMCP Tiên Phong (TPBANK)" },
    { "code": "970427", "name": "NH TMCP Việt Á (VAB)" },
    { "code": "970432", "name": "NH TMCP Việt Nam Thịnh Vương (VPBANK)" },
    { "code": "970433", "name": "NH TMCP Việt Nam Thương Tín (VIETBANK)" },
    { "code": "970434", "name": "NH TNHH Indovina (INDOVINA)" },
    { "code": "422589", "name": "NH TNHH MTV CIMB Việt Nam (CIMB)" },
    { "code": "970442", "name": "NH TNHH MTV Hongleong Việt Nam (HONGLEONG)" },
    { "code": "970439", "name": "NH TNHH MTV Public Việt Nam (PBVN)" },
    { "code": "970424", "name": "NH TNHH MTV Shinhan Việt Nam (SHBVN)" },
    { "code": "970458", "name": "NH TNHH MTV United Overseas Bank (UOB)" },
    { "code": "970457", "name": "NH Wooribank (WOORIBANK)" }
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
            return "Hoàn thành";
        } else if (code == 2) {
            return "Đang chờ";
        } else if (code == 3) {
            return "Đang xử lý";
        } else {
            return "Đã hủy";
        }
    },
    getStatusClass: function (code) {
        if (code == 1) {
            return "success";
        } else if (code == 2) {
            return "warning";
        } else if (code == 3) {
            return "primary";
        } else {
            return "danger";
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