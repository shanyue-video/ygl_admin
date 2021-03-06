export default {
    auth({Meteor, FlowRouter}, userName, userNo, wx_user_id) {
        Meteor.call('wx.auth', {userName, userNo, wx_user_id}, (error, result) => {
            if (!error) {
                if (result == 'doctor') {
                    console.log('a doctor');
                    FlowRouter.go(`/wx/chart?wx_user_id=${wx_user_id}&role=${result}`);
                } else if (result == 'user') {
                    console.log(`a ${result}`);
                    FlowRouter.go(`/wx/chart?wx_user_id=${wx_user_id}&role=${result}`);
                } else if (result == 'toNone') {
                    alert('请关注医生,进行咨询');
                    WeixinJSBridge.invoke('closeWindow',{},function(res){
                    });
                }
            }
        });
    }
}
