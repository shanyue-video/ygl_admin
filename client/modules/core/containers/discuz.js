import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Discuz from '../components/discuz.jsx';

export const composer = ({context}, onData) => {
    const {Meteor, Collections} = context();

    if (Meteor.subscribe('discuzs.list').ready()) {
        const discuzs = Collections.Discuzs.find({}, { sort: { createAt: -1 } }).fetch();
        onData(null, {discuzs});
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
)(Discuz);
