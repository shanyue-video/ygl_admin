import {RecordsTables} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {upload} from '../configs';

export default function () {
  Meteor.methods({
    'upload_records_tables_thumb.sample'(args) {
      var rt = RecordsTables.findOne({
        _id: args._id
      });

      upload(rt.thumb, function(data) {
        RecordsTables.update({
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
