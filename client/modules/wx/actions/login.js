export default {
    getUser({Meteor}, user_id) {
        console.log('out action');
        Meteor.call('wx.getUser', user_id, (error, result) => {
            if (!error) {
                if (result == 'no_doctor') {
                    alert('请关注医生,进行咨询');
                    WeixinJSBridge.invoke('closeWindow',{},function(res){
                    });
                }
            }
        });
    }
}
