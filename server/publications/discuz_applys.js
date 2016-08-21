import {DiscuzApplys} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('discuzApplys.list', function () {
    return DiscuzApplys.find();
  });
}
