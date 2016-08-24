import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Region from '../components/region.jsx';

export const composer = ({context}, onData) => {
    const {Meteor, Collections} = context();

    if (Meteor.subscribe('regions.list').ready()) {
        const regions = Collections.Regions.find({}, { sort: { createAt: -1 } }).fetch();
        onData(null, {regions});
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
)(Region);
