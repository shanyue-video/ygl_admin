import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Badge from '../badge.jsx';

storiesOf('core.Badge', module)
    .add('default view', () => {
        return (
            <Badge />
        );
    })
