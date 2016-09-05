import {Suggest} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
    Meteor.publish('suggest', function (suggestId) {
        return Suggest.find(suggestId);
    });
    Meteor.publish('suggest.list', function () {
        return Suggest.find();
    });
}
