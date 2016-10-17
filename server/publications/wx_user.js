import {WxUser} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
    Meteor.publish('wx_user', function (wx_userId) {
        //console.log('!!!');
        //console.log(WxUser.find({_id: wx_userId}).fetch());
        return WxUser.find({_id: wx_userId});
    });
}
