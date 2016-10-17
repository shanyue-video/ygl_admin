import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import LoginForm from '../components/login_form.jsx';

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
)(LoginForm);
