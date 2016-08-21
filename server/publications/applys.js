import {Applys} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('applys.status', function () {
    return Applys.find({status:1});
  });
}
