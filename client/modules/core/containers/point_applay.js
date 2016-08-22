import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import PointApplay from '../components/point_applay.jsx';

export const composer = ({context}, onData) => {
    const {Meteor, Collections} = context();

    if (Meteor.subscribe('applys.status').ready()) {
        const applys = Collections.Applys.find({}, { sort: { createAt: -1 } }).fetch();
        onData(null, {applys});
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
)(PointApplay);
