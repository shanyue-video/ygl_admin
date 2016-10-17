import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Chart from '../components/chart.jsx';

export const composer = ({context}, onData) => {
    const {Meteor, FlowRouter, Collections} = context();

    const wx_user_id = FlowRouter.getQueryParam('wx_user_id');

    if (Meteor.subscribe('wx_chart_history', wx_user_id).ready()) {
        if (Meteor.subscribe('wx_user', wx_user_id).ready()) {
            const wx_chart_history = Collections.WxChartHistory.find().fetch()[0];
            const wx_user = Collections.WxUser.find().fetch()[0];
            onData(null, {wx_chart_history, wx_user});
        }
    } else {
        onData(null, {});
    }
};

export const depsMapper = (context, actions) => ({
    sendMessage: actions.chart.sendMessage,
    context: () => context
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(Chart);
