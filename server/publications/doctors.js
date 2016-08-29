import {Doctors} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
    Meteor.publish('doctors.list', function () {
        return Doctors.find({},{fields: {cert: false}});
    });
    Meteor.publish('doctors.all_list', function () {
        return Doctors.find();
    });
    Meteor.publish('doctors.list.all', function (doctor_id) {
        return Doctors.find({_id: doctor_id});
    });
}
