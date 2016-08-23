import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Badge from '../components/badge.jsx';

export const composer = ({context}, onData) => {
    const {Meteor, Collections} = context();

    if (Meteor.subscribe('badges.list').ready()) {
        const badges = Collections.Badges.find({}, { sort: { createAt: -1 } }).fetch();
        onData(null, {badges});
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
)(Badge);
