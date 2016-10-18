import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Login from '../components/login.jsx';

export const composer = ({context}, onData) => {
    const {Meteor, Collections, FlowRouter} = context();
    const user_id = FlowRouter.getQueryParam('user_id');
    const role = 'user';

    if (Meteor.subscribe('wx_chart_history', user_id, role).ready()) {
        const wx_chart_history = Collections.WxChartHistory.find().fetch()[0];
        if (wx_chart_history && wx_chart_history.init) {
            console.log(wx_chart_history);
            FlowRouter.go(`/wx/chart?wx_user_id=${user_id}&role=${role}`);
        }
        onData(null, {wx_chart_history});
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
