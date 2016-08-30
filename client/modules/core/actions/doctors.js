import * as Collections from '/lib/collections';
import { Tracker } from 'meteor/tracker'

export default {
    getCert(doctor_id) {
        Tracker.autorun(() => {
            Meteor.subscribe('doctors.list.all', doctor_id);
        });
    },
    updateCert(doctor_id, thumb) {
        Meteor.call("update_cert", {doctor_id, thumb}, (err, result) => {
            console.log('err--->');
            console.log(err);
            console.log('result--->');
            console.log(result);
            //if (result) {
            //    alert('上传成功');
            //}
        });
    },
    updateMaster(doctor_id, master) {
        master = parseInt(master);
        //console.log(master);
        Collections.Doctors.update({
            _id: doctor_id
        }, {
            $set: {
                'master': master
            }
        });
    }
}
