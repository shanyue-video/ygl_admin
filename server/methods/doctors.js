import {Doctors} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {upload} from '../configs';

export default function () {
    Meteor.methods({
        'doctors.sample'() {

        },
        'update_cert'(args) {
            Doctors.update({
                _id: args.doctor_id
            }, {
                $set: {
                    'cert': args.thumb
                }
            });
            if(args.thumb && args.thumb.indexOf("base64") > -1) {
                upload(args.thumb, function(data) {
                    Doctors.update({
                        _id: args.doctor_id
                    }, {
                        $set: {
                            "cert": data
                        }
                    });
                }, function(e) {
                    throw e;
                });
            }
            return 'SUCCESS';
        }
    });
}
