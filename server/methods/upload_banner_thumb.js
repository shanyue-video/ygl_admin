import {Banners} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {upload} from '../configs';

export default function () {
    Meteor.methods({
        'upload_banner_thumb.sample'(args) {
            var obj = Banners.findOne({
                _id: args._id
            });
            upload(obj.thumb, function(data) {
                Banners.update({
                    _id: args._id
                }, {
                    $set: {
                        "thumb": data
                    }
                });
            }, function(e) {
                throw e;
            });
        },
        'banner_insert'(args) {
            Banners.insert(args, (err, __id) => {
                var obj = Banners.findOne({
                    _id: __id
                });
                upload(obj.thumb, function(data) {
                    Banners.update({
                        _id: args._id
                    }, {
                        $set: {
                            "thumb": data
                        }
                    });
                }, function(e) {
                    throw e;
                });
            });
        }
    });
}
