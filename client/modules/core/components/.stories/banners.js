import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Banners from '../banners.jsx';

storiesOf('core.Banners', module)
    .add('default view', () => {
        return (
            <Banners />
        );
    })
