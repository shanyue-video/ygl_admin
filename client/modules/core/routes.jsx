import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from './components/main_layout';
import Content from './containers/content';
import Navigations from './containers/navigations';

export default function (injectDeps, {FlowRouter}) {
    const MainLayoutCtx = injectDeps(MainLayout);

    FlowRouter.route('/', {
        name: 'home',
        action() {
            mount(MainLayoutCtx, {
                navigations: () => (<Navigations />),
                content: () => (<Content />)
            });
        }
    });

    FlowRouter.route('/pointApplay', {
        name: 'pointApplay',
        action() {
            mount(MainLayoutCtx, {
                navigations: () => (<Navigations />),
                //content: () => (<Content name='pointApplay' />)
                content: () => (<Content />)
            });
        }
    });
}
