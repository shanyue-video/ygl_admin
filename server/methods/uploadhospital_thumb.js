import {Hospitals} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {upload} from '../configs';

export default function () {
  Meteor.methods({
    'uploadhospital_thumb.sample'() {
      var rt = Hospitals.findOne({
        _id: args._id
      });

      upload(rt.thumb, function(data) {
        Hospitals.update({
          _id: args._id
        }, {
          $set: {
            "thumb": data
          }
        });
      }, function(e) {
        throw e;
      });
    }
  });
}
