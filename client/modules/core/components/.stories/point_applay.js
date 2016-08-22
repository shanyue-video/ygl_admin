import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import PointApplay from '../point_applay.jsx';

storiesOf('core.PointApplay', module)
  .add('default view', () => {
    return (
      <PointApplay />
    );
  })
