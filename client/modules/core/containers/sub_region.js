import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Region from '../components/sub_region.jsx';

export const composer = ({context}, onData) => {
    const {Meteor, Collections} = context();
    const parent_id = FlowRouter.getQueryParam('parent_id');

    if (Meteor.subscribe('regions.sub', parent_id).ready()) {
        const regions = Collections.Regions.find({}, { sort: { orderBy: 1 } }).fetch();
        if (regions.length > 0) {
            onData(null, {regions});
        } else {
            const hospitals = Collections.Hospitals.find({}, { sort: { orderBy: 1 } }).fetch();
            if (hospitals.length > 0) {
                FlowRouter.go('/hospitals?parent_id=' + parent_id);
            }
        }
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
