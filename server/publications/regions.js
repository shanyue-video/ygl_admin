import {Regions} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('regions.list', function () {
    return Regions.find();
  });
}
