import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import { HTTP } from 'meteor/http';
import {WxUser, Persons, WxChartHistory} from '/lib/collections'

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
                        //console.log(e);
                    }
                }
            });
        },
        'wx.auth'(obj) {
            const p = Persons.findOne({no: obj.userNo});
            if(p) {
                let modify = {realName: obj.userName};
                Persons.update({ _id: p._id }, {
                    $addToSet: {
                        wx_users: obj.wx_user_id
                    },
                    $set:modify
                });
            } else {
                const insert_obj = {
                    wx_users: [obj.wx_user_id],
                    no: obj.userNo,
                    realName: obj.userName,
                    createAt: new Date(),
                    status: 1,
                    updateAt: new Date()
                };
                Persons.insert(insert_obj);
            }
        },
        'wx.chart'(obj) {
            const chart = WxChartHistory.findOne({_id: obj.wx_chart_history_id});
            if (chart) {
                const role = obj.role == 'doctor' ? 'user': 'doctor';
                let url;
                if(role == 'doctor') {
                    url = "http://yigonglue.com/wx_send_message?user_id=" +
                        chart.doctor_id + "&doctor_openid=" + chart.wx_user_id + "&role=" + role;
                } else {
                    url = "http://yigonglue.com/wx_send_message?user_id=" +
                        chart.wx_user_id + "&doctor_openid=" + chart.doctor_id + "&role=" + role;
                }

                HTTP.get(url, (error, result) => {
                        if (!error) {
                            //const r_o = result;
                            //console.log(r_o);
                        }
                    }
                );
                WxChartHistory.update({_id: chart._id}, {
                    $addToSet: {
                        messages: {
                            message:obj.message,
                            createAt: new Date(),
                            from: obj.role
                        }
                    },
                    $set: {init: false}
                });
            }
        }
    });
}
