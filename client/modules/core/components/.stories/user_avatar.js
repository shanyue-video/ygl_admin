import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import UserAvatar from '../user_avatar.jsx';

storiesOf('core.UserAvatar', module)
  .add('default view', () => {
    return (
      <UserAvatar />
    );
  })
