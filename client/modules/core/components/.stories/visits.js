import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Visits from '../visits.jsx';

storiesOf('core.Visits', module)
    .add('default view', () => {
        return (
            <Visits />
        );
    })
