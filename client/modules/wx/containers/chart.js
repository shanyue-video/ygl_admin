import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Chart from '../components/chart.jsx';

export const composer = ({context}, onData) => {
    const {Meteor, FlowRouter, Collections} = context();

    const wx_user_id = FlowRouter.getQueryParam('wx_user_id');
    const doctor_id = FlowRouter.getQueryParam('doctor_id');
    const role = FlowRouter.getQueryParam('role');

    if (Meteor.subscribe('wx_chart_history', wx_user_id, doctor_id, role).ready()) {
        if (Meteor.subscribe('wx_user', wx_user_id).ready()) {
            const wx_chart_historys = Collections.WxChartHistory.find().fetch();
            if (wx_chart_historys.length > 1) {
                console.log('订阅的长度>1' + wx_chart_historys);
            }
            const wx_chart_history = Collections.WxChartHistory.find().fetch()[0];
            //const wx_user = Collections.WxUser.find().fetch()[0];
            let wx_user;
            if (!doctor_id) {
                wx_user = Collections.WxUser.find().fetch()[0];
            } else {
                wx_user = Collections.WxUser.find({"data.openid": wx_user_id, "doctor_data.openid": doctor_id}).fetch()[0];
            }
            onData(null, {wx_chart_history, wx_user, role});
        }
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
