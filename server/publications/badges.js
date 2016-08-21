import {Badges} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('badges.list', function () {
    return Badges.find();
  });
}
