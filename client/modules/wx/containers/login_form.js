import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import LoginForm from '../components/login_form.jsx';

export const composer = ({context}, onData) => {
    const {Meteor, FlowRouter, Collections} = context();

    const user_id = FlowRouter.getQueryParam('user_id');
    //console.log(user_id);
    //console.log('----');

    if (Meteor.subscribe('wx_user', user_id).ready()) {
        const wx_user = Collections.WxUser.find().fetch()[0];
        onData(null, {wx_user});
    } else {
        onData(null, {});
    }
};

export const depsMapper = (context, actions) => ({
    auth: actions.login_form.auth,
    context: () => context
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(LoginForm);
