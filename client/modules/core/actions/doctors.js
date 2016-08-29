import * as Collections from '/lib/collections';
import { Tracker } from 'meteor/tracker'

export default {
    getCert(doctor_id) {
        Tracker.autorun(() => {
            Meteor.subscribe('doctors.list.all', doctor_id).ready()
            /*
            if (Meteor.subscribe('doctors.list.all', doctor_id).ready()){
                //const doctor = Collections.Doctors.findOne({_id: doctor_id});
                //console.log(cert);
            //} else {
            //    console.log('waiting...');
            }
            */
        });

        /*
        let i = 0;
        while(cert == undefined && i < 1000000) {
            //Meteor._sleepForMs(5000);
            i += 1;
            console.log(i);
        }
        */

        //if(cert != undefined)
        //    return cert;
        //while(cert == undefined) {
        //
        //}
        //return cert;
        //while (!Meteor.subscribe('doctors.list.all', doctor_id).ready()){
        //    Meteor.subscribe('doctors.list.all', doctor_id);
        //    const doctor = Collections.Doctors.findOne({_id: doctor_id});
        //    cert = doctor.cert;
        //    console.log(cert);
        //}
        //return cert;
        //const cert = Meteor.call('get_doctor_cert.sample', doctor_id);
        //console.log('!!!');
        //console.log(cert);
    }
}
