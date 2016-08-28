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
                    console.log('start insert new oss');
                    Banners.update({
                        _id: args.__id
                    }, {
                        $set: {
                            "thumb": data
                        }
                    });
                }, function(e) {
                    throw e;
                });
            });
        },
        'banner_update'(args) {
            //return 'success'+args.__id;
            ///*
            Banners.update({
                _id: args.__id
            }, {
                $set: args.obj
            });
            //console.log('---');
            //console.log(__id);
            //console.log(x);
            //var obj = Banners.findOne({
            //    _id: __id
            //});
            const obj = args.obj;
            if(obj.thumb && obj.thumb.indexOf("base64") > -1) {
                upload(obj.thumb, function(data) {
                    console.log('start update new oss');
                    console.log(data);
                    console.log(args);
                    Banners.update({
                        _id: args.__id
                    }, {
                        $set: {
                            "thumb": data
                        }
                    });
                }, function(e) {
                    throw e;
                });
            }
            //*/
        }
    });
}
