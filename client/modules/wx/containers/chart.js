import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Chart from '../components/chart.jsx';

export const composer = ({context}, onData) => {
    const {Meteor, Collections} = context();

    onData(null, {});
};

export const depsMapper = (context, actions) => ({
    context: () => context
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(Chart);
