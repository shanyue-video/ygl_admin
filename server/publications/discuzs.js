import {Discuzs} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('discuzs.list', function () {
    return Discuzs.find();
  });
}
