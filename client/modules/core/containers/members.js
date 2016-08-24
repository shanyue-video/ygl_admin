import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Members from '../components/members.jsx';

export const composer = ({context}, onData) => {
    const {Meteor} = context();

    if (Meteor.subscribe('users.list').ready()) {
        const members = Meteor.users.find({}, { sort: { createAt: -1 } }).fetch();
        onData(null, {members});
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
)(Members);
