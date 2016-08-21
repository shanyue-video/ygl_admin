import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'set_the_member_master.sample'(args) {
      Meteor.users.update({_id:args.uid},{$set:{master:args.master}})
    }
  });
}
