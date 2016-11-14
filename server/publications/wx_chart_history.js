import {WxChartHistory, WxUser} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
    Meteor.publish('wx_chart_history', function (wx_user_id, doctor_id, role) {
        // 发起聊天的都是患者
        if (role == 'user') {
            const wch = WxChartHistory.find({wx_user_id: wx_user_id, doctor_id: doctor_id}).fetch();
            if (wch.length == 0 || !doctor_id) {
                const wx_user = WxUser.find({u_id: wx_user_id}, {sort: {createAt: -1}}).fetch()[0];
                doctor_id = wx_user.doctor_data.openid;
                const init_his = {
                    wx_user_id: wx_user._id,
                    doctor_id: wx_user.doctor_data.openid,
                    init: true
                };
                WxChartHistory.insert(init_his);
            }
            return WxChartHistory.find({wx_user_id: wx_user_id, doctor_id: doctor_id});
        } else if (role == 'doctor') {
            return WxChartHistory.find({wx_user_id: wx_user_id, doctor_id: doctor_id});
        }
    });
}
