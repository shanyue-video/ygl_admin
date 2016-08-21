import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Content from '../content.jsx';

storiesOf('core.Content', module)
  .add('default view', () => {
    return (
      <Content />
    );
  })
