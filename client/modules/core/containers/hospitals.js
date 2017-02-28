import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Hospitals from '../components/hospitals.jsx';

export const composer = ({context}, onData) => {
    const {Meteor, Collections} = context();

    const parent_id = FlowRouter.getQueryParam('parent_id');
    if (Meteor.subscribe('regions.sub', parent_id).ready()) {
            const hospitals = Collections.Hospitals.find({}, { sort: { orderBy: 1 } }).fetch();
            onData(null, {hospitals});
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
)(Hospitals);
