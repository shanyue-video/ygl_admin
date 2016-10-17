import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Login from '../components/login.jsx';

export const composer = ({context}, onData) => {
    const {Meteor, Collections} = context();

    onData(null, {});
};

export const depsMapper = (context, actions) => ({
    getUser: actions.login.getUser,
    context: () => context
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(Login);
