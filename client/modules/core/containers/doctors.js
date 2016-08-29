import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Doctors from '../components/doctors.jsx';

export const composer = ({context}, onData) => {
    const {Meteor, Collections} = context();

    //if (Meteor.subscribe('doctors.list').ready()) {
    if (Meteor.subscribe('doctors.all_list').ready()) {
        const doctors = Collections.Doctors.find({}, { sort: { createAt: -1 } }).fetch();
        onData(null, {doctors});
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
)(Doctors);
