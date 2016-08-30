import {Mongo} from 'meteor/mongo';

const Doctors = new Mongo.Collection('doctors');
Doctors.allow({
    update: () => {
        return true;
    },
});

export default Doctors;
