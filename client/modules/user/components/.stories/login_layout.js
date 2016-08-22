import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import LoginLayout from '../login_layout.jsx';

storiesOf('user.LoginLayout', module)
  .add('default view', () => {
    return (
      <LoginLayout />
    );
  })
