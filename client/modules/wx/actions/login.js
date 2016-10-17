export default {
    getUser({Meteor}, user_id) {
        console.log('out action');
        Meteor.call('wx.getUser', user_id, (error, result) => {
            console.log('in action');
            //console.log(Session.get("user"));
        });
    }
}
