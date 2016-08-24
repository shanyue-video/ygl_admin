import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Discuz from '../discuz.jsx';

storiesOf('core.Discuz', module)
    .add('default view', () => {
        return (
            <Discuz />
        );
    })
