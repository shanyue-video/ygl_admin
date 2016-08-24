import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Referral from '../components/referral.jsx';

export const composer = ({context}, onData) => {
    const {Meteor, Collections} = context();

    if (Meteor.subscribe('referral.status').ready()) {
        const referrals = Collections.Referrals.find({}, { sort: { createAt: -1 } }).fetch();
        onData(null, {referrals});
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
