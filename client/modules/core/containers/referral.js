import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Referral from '../components/referral.jsx';

export const composer = ({context}, onData) => {
    const {Meteor, Collections} = context();

    if (Meteor.subscribe('referral.status').ready() && Meteor.subscribe('doctors.list').ready()) {
        const referrals = Collections.Referrals.find({}, { sort: { createAt: -1 } }).fetch();
        const doctors = Collections.Doctors.find({}, { sort: { createAt: -1 } }).fetch();
        onData(null, {referrals, doctors});
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
)(Referral);
