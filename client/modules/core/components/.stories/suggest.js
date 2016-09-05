import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Suggest from '../suggest.jsx';

storiesOf('core.Suggest', module)
    .add('default view', () => {
        return (
            <Suggest />
        );
    })
