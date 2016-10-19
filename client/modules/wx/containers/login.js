import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Login from '../components/login.jsx';

export const composer = ({context}, onData) => {
    const {Meteor, Collections, FlowRouter} = context();
    const user_id = FlowRouter.getQueryParam('user_id');

    if (Meteor.subscribe('wx_user', user_id).ready()) {
        const wx_user = Collections.WxUser.find().fetch()[0];
        if (wx_user && wx_user.role == 'doctor') {
            WeixinJSBridge.invoke('closeWindow',{},function(res){
                alert('已经认证该医生');   //未来可以改成多用户聊天窗口选择的模式
            });
            return false;
        } else if (wx_user && wx_user.role == 'user') {
            FlowRouter.go(`/wx/chart?wx_user_id=${user_id}&role=user`);
        }
        onData(null, {});
    } else {
        onData(null, {});
    }
};

export const depsMapper = (context, actions) => ({
    getUser: actions.login.getUser,
    context: () => context
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(Login);
