import {Tracks, Applys} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
    Meteor.methods({
        'agree_point_apply.sample'(args) {
            var obj = Applys.findOne({
                _id: args._id
            });
            /*
            if (!obj.checked) {
                Applys.update({ _id: args._id }, { $set: { check: 1 } });
                Meteor.users.update({
                    _id: obj.userid
                }, {
                    $inc: {
                        balance: (obj.balance * -1)
                    }
                });

                Tracks.insert({
                    userid: obj.userid,
                    balance: (obj.balance * -1),
                    createAt: new Date(),
                    status: 1,
                    desc: "已发送到您的帐户请查收",
                    type: "APPLYCASH",
                    typeName: "申请通过",

                });
            }
            */
            console.log(obj);
        }
    });
}
