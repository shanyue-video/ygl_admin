import {Regions, Hospitals} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
    Meteor.publish('regions.list', function () {
        return Regions.find({parent: "root"});
    });

    Meteor.publish('regions.sub', function (parent_id) {
        return [Regions.find({parent: parent_id}), Hospitals.find({"region": parent_id})];
    });
}
