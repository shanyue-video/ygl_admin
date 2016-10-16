import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/wx/components/login_layout.jsx';
import Login from './containers/login.js'

export default function (injectDeps, {FlowRouter}) {
    const MainLayoutCtx = injectDeps(MainLayout);

    var wxRoutes = FlowRouter.group({
        prefix: '/wx',
        name: 'wx',
        triggersEnter: [function(context, redirect) {
            console.log('running group triggers');
        }]
    });

    wxRoutes.notFound = {
        //     Subscriptions registered here don't have Fast Render support.
        name: 'notFound',
        action() {
            mount(MainLayout, {
                content: () => (<Login />)
            });
        }
    };

    wxRoutes.route('/login', {
        name: 'login',
        action() {
            mount(MainLayoutCtx, {
                content: () => (<Login />)
            });
        }
    });
}
