import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Banners from '../components/banners.jsx';

export const composer = ({context}, onData) => {
    const {Meteor, Collections} = context();

    if (Meteor.subscribe('banners.list').ready()) {
        const banners = Collections.Banners.find({}, { sort: { createAt: -1 } }).fetch();
        onData(null, {banners});
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
)(Banners);
