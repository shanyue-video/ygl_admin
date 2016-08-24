import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Recommand from '../recommand.jsx';

storiesOf('core.Recommand', module)
    .add('default view', () => {
        return (
            <Recommand />
        );
    })
