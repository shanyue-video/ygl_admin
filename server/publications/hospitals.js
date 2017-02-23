import {Hospitals} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
    Meteor.publish('hospitals', function () {
        return Hospitals.find();
    });
    Meteor.publish('hospitals.region', function (region) {
        return Hospitals.find({"region": region});
    });
}
