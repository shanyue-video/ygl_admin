import {Discuzs} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {upload} from '../configs';

export default function () {
  Meteor.methods({
    'upload_discuz_thumb.sample'(args) {
      var discuz = Discuzs.findOne({
        _id: args._id
      });
      upload(discuz.thumb, function(data) {
        Discuzs.update({
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
