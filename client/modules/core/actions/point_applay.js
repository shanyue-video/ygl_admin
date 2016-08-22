import {Meteor} from 'meteor/meteor';

export default {

    confirm(aid) {
        Meteor.call("agree_point_apply.sample", { _id: aid }, function() {

        })
    }
    
}