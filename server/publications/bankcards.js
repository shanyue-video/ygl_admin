import {Bankcards} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('bank.list', function () {
    return Bankcards.find();
  });
}
