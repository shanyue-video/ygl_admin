import React from 'react';
import {mount} from 'react-mounter';

import LoginLayout from '/client/modules/user/components/login_layout.jsx';
import Login from './containers/login.js'

export default function (injectDeps, {FlowRouter}) {
    const MainLayout = injectDeps(LoginLayout);

    // FlowRouter.route('', {
    //   name: '',
    //   action() {
    //     mount(MainLayoutCtx, {
    //       content: () => (< />)
    //     });
    //   }
    // });

    FlowRouter.notFound = {
        //     Subscriptions registered here don't have Fast Render support.
        name: 'notFound',
        action() {
            mount(MainLayout, {
                content: () => (<Login />)
            });
        }
    };

}
