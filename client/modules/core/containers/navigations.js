import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Navigations from '../components/navigations.jsx';

export const composer = ({context}, onData) => {
    const {Meteor, Collections} = context();

    let user = Meteor.user();
    console.log('----->user');
    console.log(user);
    user = 'dj';
    //if()

    onData(null, {user});
};

export const depsMapper = (context, actions) => ({
    urlGo: actions.Navigations.urlGo,
    context: () => context
});

export default composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
)(Navigations);
