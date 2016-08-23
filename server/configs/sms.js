import { HTTP } from 'meteor/http';

const sms ={
    // uid=1234&auth=faea920f7412b5da7be0cf42b8c93759&mobile=13612345678&msg=hello&expid=0
    server: 'http://210.5.158.31:9011/hy/?',

    uid: "8085911",
    code: "ygl2016",
    pwd: "ygl2016",

    send: function(tel, html) {
        console.log("======SMS========");
        console.log("tel:" + tel);
        console.log("html:" + html);
        console.log("sms.uid:" + sms.uid );
        console.log("sms.code:" + sms.code );
        console.log("sms.pwd:" + sms.pwd );
        console.log("sms.server:" + sms.server );
        HTTP.get(sms.server,{
            params:{
                uid: sms.uid,
                auth: CryptoJS.MD5(sms.code + sms.pwd).toString().toLowerCase(),
                mobile: tel,
                msg: html,
                expid:0,
                encode:"utf-8",
            }
        }, function(error, result) {
            if (!error) {
                console.log("SMS-RES:" + result.content);
            } else {
                console.log("SMS-ERR:" + error);
            }
        });
        console.log("======SMS-SEND========");
    }
};

export default sms;
