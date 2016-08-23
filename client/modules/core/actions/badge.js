export default {

    confirm(aid) {
        Meteor.call("badge.sample", { _id: aid }, function() {

        })
    }

}
