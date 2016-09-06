import {Doctors, Referrals} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {sms} from '../configs';

export default function () {
    Meteor.methods({
        'notify_referral.sample'(args) {
            var doc = Doctors.findOne({ _id: args.doctor });
            var ref = Referrals.findOne({_id:args.referral});
            if(doc && ref){
                var user = Meteor.users.findOne({_id:doc.userid});
                sms.send(user.tel,"为您指派了一个转诊请尽快登陆APP查看.");
            }
        },
        'notify_referral.send'(args) {
            const doctor = Doctors.findOne({_id: args.doctor_id});
            const ref = Referrals.findOne({_id: args.re_id});
            Referrals.update({
                _id: args.re_id
            }, {
                $set: {
                    "master.doctor": doctor._id,
                    "master.userid": doctor.userid,
                    "master.name": doctor.doctorName,
                    adminAt: new Date(),
                    checkAdmin: 1,
                    checkRef:0,
                }
            });
            if(doctor && ref){
                var user = Meteor.users.findOne({_id:doctor.userid});
                const message = `${user.nickname}主任，您好！您有一条待接诊信息请您及时处理。`;
                sms.send(user.tel,message);
            }
        },
    });
}
