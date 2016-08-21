import {Doctors} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('doctors.list', function () {
    return Doctors.find({},{fields: {cert: false}});
  });
}
