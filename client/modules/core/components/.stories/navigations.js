import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Navigations from '../navigations.jsx';

storiesOf('core.Navigations', module)
  .add('default view', () => {
    return (
      <Navigations />
    );
  })
