import {Feilds} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('visits.list', function () {
    return Feilds.find();
  });
}
