import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import { HTTP } from 'meteor/http';
import {WxUser} from '/lib/collections'

export default function () {
    Meteor.methods({
        'wx.getUser'(user_id) {
            HTTP.get(`http://yigonglue.com/wx_get_user?user_id=${user_id}`, (error, result) => {
                if (!error) {
                    const r_o = result;
                    try {
                        WxUser.insert({
                            _id: r_o.data.openid,
                            data: r_o.data
                        });
                    } catch (e) {
                        console.log('insert dump id');
                        console.log(e);
                    }
                }
            });
        }
    });
}
