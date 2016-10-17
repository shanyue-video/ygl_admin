export default {
    auth({Meteor, FlowRouter}, userName, userNo, wx_user_id) {
        Meteor.call('wx.auth', {userName, userNo, wx_user_id}, (error, result) => {
            if (!error) {
                console.log('no error' + result);
                FlowRouter.go(`/wx/chart?wx_user_id=${wx_user_id}`);
            }
        });
    }
}
