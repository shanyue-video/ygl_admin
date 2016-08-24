import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Region from '../region.jsx';

storiesOf('core.Region', module)
    .add('default view', () => {
        return (
            <Region />
        );
    })
