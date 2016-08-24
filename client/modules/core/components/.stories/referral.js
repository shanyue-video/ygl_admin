import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Referral from '../referral.jsx';

storiesOf('core.Referral', module)
    .add('default view', () => {
        return (
            <Referral />
        );
    })
