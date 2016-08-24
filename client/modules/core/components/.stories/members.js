import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Members from '../members.jsx';

storiesOf('core.Members', module)
    .add('default view', () => {
        return (
            <Members />
        );
    })
