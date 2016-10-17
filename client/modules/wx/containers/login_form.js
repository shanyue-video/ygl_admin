import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import LoginForm from '../components/login_form.jsx';

export const composer = ({context}, onData) => {
    const {Meteor, Collections} = context();

    const user_id = FlowRouter.getQueryParam('user_id');
    //console.log(user_id);
    //console.log('----');

    if (Meteor.subscribe('wx_user', user_id).ready()) {
        const wx_user = Collections.WxUser.find().fetch()[0];
        //console.log(wx_user);
        //console.log('wx_user');
        onData(null, {wx_user});
    } else {
        onData(null, {});
    }
};

export const depsMapper = (context, actions) => ({
    context: () => context
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(LoginForm);
