import {Banners} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('banners.list', function () {
    return Banners.find();
  });
}
