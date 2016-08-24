import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Visits from '../components/visits.jsx';

export const composer = ({context}, onData) => {
    const {Meteor, Collections} = context();

    if (Meteor.subscribe('visits.list').ready()) {
        const feilds = Collections.Feilds.find({}, { sort: { createAt: -1 } }).fetch();
        onData(null, {feilds});
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
)(Visits);
