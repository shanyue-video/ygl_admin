import {News} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
    Meteor.methods({
        'news_update'(args) {
            News.update({
                _id: args.__id
            }, {
                $set: args.obj
            });
            const obj = args.obj;
            if(obj.thumb && obj.thumb.indexOf("base64") > -1) {
                upload(obj.thumb, function(data) {
                    //console.log('start update new oss');
                    //console.log(data);
                    //console.log(args);
                    News.update({
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
        }
    });
}
