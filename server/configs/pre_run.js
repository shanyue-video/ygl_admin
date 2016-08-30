import {Meteor} from 'meteor/meteor';
import upload from './oss.js';
import {Doctors} from '/lib/collections';

const run = () => {
    var update_cert = () => {
        let ones = Doctors.find({cert: {$exists: true}}).fetch();
        ones.forEach((one) => {
            if(one.cert && one.cert.indexOf("base64") > -1) {
                console.log(one);
                upload(one.cert, function(data) {
                    Doctors.update({
                        _id: one._id
                    }, {
                        $set: {
                            "cert": data
                        }
                    });
                }, function(e) {
                    throw e;
                });
            }
        });
    };

    setInterval(Meteor.bindEnvironment(update_cert), 1000 * 1000);
};

export default run;