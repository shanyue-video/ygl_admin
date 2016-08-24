import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import News from '../news.jsx';

storiesOf('core.News', module)
    .add('default view', () => {
        return (
            <News />
        );
    })
