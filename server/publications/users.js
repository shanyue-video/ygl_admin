import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('users.list', function () {
    return Meteor.users.find();
  });
}
