import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {facc} from '/lib/model'
//import {MD5} from 'crypto-browserify'
//import {CryptoJS} from 'meteor/CryptoJS'
import {CryptoJS} from 'meteor/jparker:crypto-core'
//var MD5 = require('crypto-browserify/md5.js');
//var CryptoJS = require('crypto-browserify');

export default function () {
    Meteor.methods({
        'account_login_with_tel.sample'(args) {
            console.log(args);
            if ((args.tel == "") || !facc.checkTel(args.tel)) {
                return "ERROR_UNKONE";
            }

            console.log(args);

            var user = Meteor.users.findOne({
                tel: args.tel
            });

            if (!user) {
                return "ERROR_NONE";
            }

            if((facc.needAdmin == 1) && (user.isadmin != 1)){
                return "ERROR_RIGHT";
            }

            const salt = user.salt;

            var md5 = CryptoJS.MD5(args.password + salt).toString();
            console.log(md5);


            //if (md5 != user.password) {
            //    return "ERROR_PWD";
            //}

            this.setUserId(user._id);

            return {
                "_id": user._id,
                "nickname": user.nickname,
                "avatar": user.avatar,
            };
        }
    });
}
