export default {
    getUser({Meteor}, user_id) {
        console.log('out action');
        Meteor.call('wx.getUser', user_id, (error, result) => {
            if (!error) {
                console.log(result);
                console.log('in action');
            }
        });
    }
}
