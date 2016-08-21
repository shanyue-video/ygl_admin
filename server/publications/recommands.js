import {Recommands} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('recommand.list', function () {
    return Recommands.find();
  });
}
