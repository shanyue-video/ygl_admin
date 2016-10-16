import { configure, setAddon, addDecorator } from '@kadira/storybook';
import { disable } from 'react-komposer';

disable();

function loadStories() {
    require('../client/modules/wx/components/.stories/index.js');
  require('../client/modules/user/components/.stories/index.js');
  // require as many as stories you need.
  require('../client/modules/core/components/.stories/index.js');
}

configure(loadStories, module);
