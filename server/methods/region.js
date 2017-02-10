import {Regions} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
    Meteor.methods({
        'region_insert'(args) {
            Regions.insert({
                name: args.name,
                baiduid: args.baiduid,
                baidupid: args.baidupid,
                orderBy: args.orderBy,
                parent: args.parent,
                status: args.status,
                summary: args.summary,
                createAt: new Date()
            });
        },
        'region_insert_or_update'(args) {
            const region = Regions.findOne({_id: args._id});
            if(!region) {
                Regions.insert({
                    name: args.name,
                    baiduid: args.baiduid,
                    baidupid: args.baidupid,
                    orderBy: args.orderBy,
                    parent: args.parent,
                    status: args.status,
                    summary: args.summary,
                    createAt: new Date()
                });
            }
            else {
                Regions.update({
                    _id: args._id
                }, {
                    $set: {
                        name: args.name,
                        baiduid: args.baiduid,
                        baidupid: args.baidupid,
                        orderBy: args.orderBy,
                        parent: args.parent,
                        status: args.status,
                        summary: args.summary
                    }
                });
            }
        }
    });
}
