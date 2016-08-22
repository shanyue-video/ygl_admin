export default {

    confirm({Meteor}, aid) {
        Meteor.call("agree_point_apply", { _id: aid }, function() {

        })
    }
    
}
