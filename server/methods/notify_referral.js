import {Doctors, Referrals} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {sms} from '/lib/model';

export default function () {
  Meteor.methods({
    'notify_referral.sample'(args) {
      var doc = Doctors.findOne({ _id: args.doctor });
      var ref = Referrals.findOne({_id:args.referral});
      if(doc && ref){
        var user = Meteor.users.findOne({_id:doc.userid});
        sms.send(user.tel,"为您指派了一个转诊请尽快登陆APP查看.");
      }
    }
  });
}
