import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Login from '../login.jsx';

storiesOf('user.Login', module)
  .add('default view', () => {
    return (
      <Login />
    );
  })
