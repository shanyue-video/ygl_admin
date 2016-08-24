import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Recommand from '../components/recommand.jsx';

export const composer = ({context}, onData) => {
    const {Meteor, Collections} = context();

    if (Meteor.subscribe('recommand.list').ready()) {
        const recommand = Collections.Recommands.find({}, { sort: { createAt: -1 } }).fetch();
        onData(null, {recommand});
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
)(Recommand);
