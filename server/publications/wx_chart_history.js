import {WxChartHistory, WxUser} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
    Meteor.publish('wx_chart_history', function (wx_user_id, role) {
        let wch;
        if (role == 'user') {
            wch = WxChartHistory.find({wx_user_id: wx_user_id}).fetch();
        } else if (role == 'doctor') {
            wch = WxChartHistory.find({wx_user_id: wx_user_id}).fetch();
        }
        const wx_user = WxUser.find({_id: wx_user_id}).fetch();
        if(wx_user.length == 0) {
            return [];
        }
        if(wch.length == 0) {
            const init_his = {
                wx_user_id: wx_user[0]._id,
                doctor_id: wx_user[0].doctor_openid,
                init: true
            };
            WxChartHistory.insert(init_his);
        }
        return WxChartHistory.find({wx_user_id: wx_user_id});
    });
}
