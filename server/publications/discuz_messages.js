import {DiscuzMessages} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('discuzMessages.list', function () {
    return DiscuzMessages.find();
  });
}
