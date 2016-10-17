import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import { HTTP } from 'meteor/http';

export default function () {
    Meteor.methods({
        'wx.getUser'(user_id) {
            HTTP.get(`http://yigonglue.com/wx_get_user?user_id=${user_id}`, (error, result) => {
                if (!error) {
                    console.log(result);
                }
            });
        }
    });
}
