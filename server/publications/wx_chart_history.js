import {WxChartHistory, WxUser} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
    Meteor.publish('wx_chart_history', function (wx_user_id) {
        //console.log('---');
        //console.log(wx_user_id);
        //return WxChartHistory.find({wx_user_id: wx_user_id});
        const wch = WxChartHistory.find({wx_user_id: wx_user_id}).fetch();
        const wx_user = WxUser.find({_id: wx_user_id}).fetch();
        //console.log(wch);
        //console.log(wx_user);
        if(wx_user.length == 0) {
            return [];
        }
        if(wch.length == 0) {
            const init_his = {
                wx_user_id: wx_user[0]._id,
                doctor_id: wx_user[0].doctor_openid
            };
            WxChartHistory.insert(init_his);
        }
        return WxChartHistory.find({wx_user_id: wx_user_id});
    });
}
