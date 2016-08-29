import * as Collections from '/lib/collections';
import { Tracker } from 'meteor/tracker'

export default {
    getCert(doctor_id) {
        Tracker.autorun(() => {
            Meteor.subscribe('doctors.list.all', doctor_id).ready()
        });
    }
}
