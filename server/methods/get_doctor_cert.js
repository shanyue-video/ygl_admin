import {Doctors} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
    Meteor.methods({
        'get_doctor_cert.sample'(doctor_id) {
            return Doctors.findOne({_id: doctor_id});
        }
    });
}
