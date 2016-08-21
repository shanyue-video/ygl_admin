import {News} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {upload} from '../configs';

export default function () {
  Meteor.methods({
    'upload_news_thumb.sample'(args) {
      var obj = News.findOne({
        _id: args._id
      });
      upload(obj.thumb, function(data) {
        News.update({
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
