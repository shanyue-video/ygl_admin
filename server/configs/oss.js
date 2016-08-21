var ALY = require('aliyun-sdk/index.js');
const oss = new ALY.OSS({
    accessKeyId: "yYlOJE1T4NmsAi69",
    secretAccessKey: "Rgq8ToXYEcp5Xn28oOWyfRRyD5Y3U5",
    // endpoint: "http://oss-cn-beijing.aliyuncs.com", //测试环境
    endpoint: 'http://oss-cn-beijing-internal.aliyuncs.com', //线上环境
    apiVersion: '2013-10-15'
});

const upload = function(img, callback) {

    var prefix = img.substr(0, img.indexOf("base64") + 7);

    var ext = "jpg";
    var mine = "image/jpeg";
    if (prefix.indexOf("png") > 0) {
        ext = "png";
        mine = "image/png";
    } else if (prefix.indexOf("gif") > 0) {
        ext = "gif";
        mine = "image/gif";
    }

    var name = "asset/" + parseInt(Math.random() * 10000000000) + "." + ext;

    var data = img.replace(/^data:image\/\w+;base64,/, "");
    var base64 = new Buffer(data, "base64");


    var url = "http://cdn.yigonglue.com/" + name;
    oss.putObject({
            Bucket: 'yglweb',
            Key: name, // 注意, Key 的值不能以 / 开头, 否则会返回错误.
            Body: base64,
            AccessControlAllowOrigin: '*',
            ContentType: mine,
            CacheControl: 'no-cache', // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9
            ContentDisposition: '', // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec19.html#sec19.5.1
            ContentEncoding: 'utf-8', // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.11
            ServerSideEncryption: 'AES256',
            Expires: null // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.21
        },
        Meteor.bindEnvironment(function(err, msg) {
            if (err) {
                console.log(err);
            } else {
                callback(url);
            }

        })
    );
};

export default upload;