import {Referrals} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('referral.status', function () {
    return Referrals.find({status:1});
  });
}
