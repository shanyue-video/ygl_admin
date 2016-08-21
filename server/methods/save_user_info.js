import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'save_user_info.sample'(args) {
      Meteor.users.update(args.select, {
        $set: {
          point: args.fields.point,
          balance: args.fields.balance,
          isadmin: args.fields.isadmin,
          master:  args.fields.master,
          vaild:  args.fields.vaild,
          role:  args.fields.role,
        },
      });
    }
  });
}
