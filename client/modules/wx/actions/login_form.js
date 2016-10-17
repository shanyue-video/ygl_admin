export default {
    auth({Meteor}, userName, userNo, wx_user_id) {
        Meteor.call('wx.auth', {userName, userNo, wx_user_id}, (error, result) => {
            if (!error) {
                //console.log(result);
                console.log('in action');
            }
        });
    }
}
