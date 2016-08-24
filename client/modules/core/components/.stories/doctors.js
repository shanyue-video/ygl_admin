import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Doctors from '../doctors.jsx';

storiesOf('core.Doctors', module)
    .add('default view', () => {
        return (
            <Doctors />
        );
    })
