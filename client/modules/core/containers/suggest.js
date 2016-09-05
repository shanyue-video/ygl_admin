import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Suggest from '../components/suggest.jsx';

export const composer = ({context}, onData) => {
    const {Meteor, Collections} = context();

    if (Meteor.subscribe('suggest.list').ready()) {
        const suggest = Collections.Suggest.find({}, { sort: { createAt: -1 } }).fetch();
        onData(null, {suggest});
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
)(Suggest);
