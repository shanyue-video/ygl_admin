import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import News from '../components/news.jsx';

export const composer = ({context}, onData) => {
    const {Meteor, Collections} = context();

    if (Meteor.subscribe('news.list').ready()) {
        const news = Collections.News.find({}, { sort: { createAt: -1 } }).fetch();
        onData(null, {news});
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
)(News);
