import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'pass_the_member_vaild.sample'() {
      Meteor.users.update({_id:args.uid},{$set:{vaild:1}})
    }
  });
}
