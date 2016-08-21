import {Departments} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('departments.list', function () {
    return Departments.find();
  });
}
